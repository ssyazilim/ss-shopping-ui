import type { z, ZodObject, ZodRawShape, ZodType } from "zod"
import type { IAnyField, IAnyList, IAnyTree, IFormShape } from "@ssyazilim/ss-shopping-schemas"

// ─── Internal Helpers ─────────────────────────────────────────────────────────
const isField = (node: unknown): node is IAnyField =>
  typeof node === "object" &&
  node !== null &&
  "error" in node &&
  "value" in node &&
  Object.keys(node).length === 2

const isPlainObject = (val: unknown): val is Record<string, unknown> =>
  val !== null && typeof val === "object" && !Array.isArray(val)

const buildTree = (values: Record<string, unknown>): IAnyTree => {
  return Object.keys(values).reduce<IAnyTree>((acc, key) => {
    const val = values[key]
    if (isPlainObject(val)) {
      acc[key] = buildTree(val as Record<string, unknown>)
    } else {
      acc[key] = { value: structuredClone(val), error: "" }
    }
    return acc
  }, {})
}

function extractValues(tree: IAnyTree): Record<string, unknown>
function extractValues(tree: IAnyList): unknown[]
function extractValues(tree: IAnyTree | IAnyList): Record<string, unknown> | unknown[]
function extractValues(tree: IAnyTree | IAnyList): Record<string, unknown> | unknown[] {
  if (Array.isArray(tree)) {
    return tree.map((node) => (isField(node) ? node.value : extractValues(node)))
  }

  return Object.keys(tree).reduce<Record<string, unknown>>((acc, key) => {
    const node = tree[key]
    if (!node) return acc
    acc[key] = isField(node) ? node.value : extractValues(node)
    return acc
  }, {})
}

const clearErrors = (tree: IAnyTree | IAnyList): void => {
  Object.values(tree).forEach((node) => {
    if (!node) return
    if (isField(node)) {
      node.error = ""
    } else {
      clearErrors(node)
    }
  })
}

const setErrorAtPath = (tree: IAnyTree | IAnyList, path: Array<string | number>, message: string): void => {
  if (path.length === 0) return
  const [head, ...tail] = path
  const node = Array.isArray(tree) ? tree[Number(head)] : tree[String(head)]
  if (!node) return

  if (tail.length === 0) {
    if (isField(node)) node.error = message
    return
  }

  if (!isField(node)) {
    setErrorAtPath(node, tail, message)
  }
}

const mergeReset = (target: IAnyTree | IAnyList, source: IAnyTree | IAnyList): void => {
  Object.entries(source).forEach(([key, s]) => {
    const t = Array.isArray(target) ? target[Number(key)] : target[key]
    if (!t || !s) return
    if (isField(t) && isField(s)) {
      t.value = s.value
      t.error = ""
    } else if (!isField(t) && !isField(s)) {
      mergeReset(t, s)
    }
  })
}

// ─── Utils ────────────────────────────────────────────────────────────────────
export const pathToKey = (path: Array<string | number>): string =>
  path.map((seg, i) => (typeof seg === "number" ? `[${seg}]` : i === 0 ? seg : `.${seg}`)).join("")

// ─── Path Types ───────────────────────────────────────────────────────────────
type PathInto<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathInto<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never

// ─── Composable ───────────────────────────────────────────────────────────────
export const useForm = <
  TShape extends ZodRawShape,
  T extends Record<string, unknown> = z.infer<ZodObject<TShape>>,
>(options: {
  schema: ZodObject<TShape>
  values: T
}) => {
  const { schema, values: initialValues } = options
  const submitted = ref(false)

  const fields = reactive(buildTree(initialValues as Record<string, unknown>)) as unknown as IFormShape<T>

  const f = <P extends string>(path: P): PathInto<IFormShape<T>, P> => {
    const keys = path.split(".")
    let current: unknown = fields
    for (const key of keys) {
      if (!isPlainObject(current)) break
      current = (current as Record<string, unknown>)[key]
    }
    return current as PathInto<IFormShape<T>, P>
  }

  const validateField = (path: string): void => {
    const keys = path.split(".")
    const topKey = keys[0]
    if (!topKey) return

    // schema'dan top-level field'ı al
    const fieldSchema = schema.shape[topKey] as ZodType | undefined
    if (!fieldSchema) return

    const rawValues = extractValues(toRaw(fields) as unknown as IAnyTree)

    // nested ise tüm parent objeyi validate et
    const valueToValidate = keys.length > 1 ? rawValues[topKey] : rawValues[topKey]
    const result = fieldSchema.safeParse(valueToValidate)

    // node'u path'e göre bul
    const tree = fields as unknown as IAnyTree
    const node = keys.reduce<unknown>((current, key) => {
      if (!current || !isPlainObject(current)) return undefined
      return (current as IAnyTree)[key]
    }, tree)

    if (!node || !isField(node)) return

    if (result.success) {
      node.error = ""
    } else {
      // nested path için doğru issue'yu bul
      const issue = result.error.issues.find((i) =>
        keys.slice(1).every((k, idx) => String(i.path[idx]) === k)
      )
      node.error = issue?.message ?? ""
    }
  }

  const handleSubmit = (cb: (values: T) => void) => {
    return (): void => {
      submitted.value = true
      const rawTree = fields as unknown as IAnyTree
      clearErrors(rawTree)

      const values = extractValues(rawTree)
      const result = schema.safeParse(values)

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const topKey = String(issue.path[0] ?? "")
          if (!topKey || !(topKey in rawTree)) return

          const nestedLabel =
            issue.path.length > 1 ? `${pathToKey(issue.path.slice(1) as Array<string | number>)}` : ""
          const message = issue.message
          const { notify } = useNotification()
          notify(`${nestedLabel.length > 0 ? nestedLabel : issue.path} → ${message} `)
          setErrorAtPath(rawTree, issue.path as Array<string | number>, message)
        })

        return
      }

      cb(result.data as T)
    }
  }

  const resetFields = (): void => {
    submitted.value = false
    const fresh = buildTree(initialValues as Record<string, unknown>)
    mergeReset(fields as unknown as IAnyTree, fresh)
  }

  const setValues = (newValues: Partial<T>): void => {
    const fresh = buildTree(newValues as Record<string, unknown>)
    mergeReset(fields as unknown as IAnyTree, fresh)
  }

  const watchFields = (): void => {
    const watchTree = (tree: IAnyTree | IAnyList, parentPath?: string): void => {
      Object.entries(tree).forEach(([key, node]) => {
        if (!node) return

        const path = parentPath ? `${parentPath}.${key}` : key

        if (isField(node)) {
          watch(
            toRef(node as { value: unknown }, "value"),
            () => {
              if (!submitted.value) return
              validateField(path)
            },
            { deep: true }
          )
        } else {
          watchTree(node, path)
        }
      })
    }

    watchTree(fields as unknown as IAnyTree)
  }

  return { f, validateField, handleSubmit, watchFields, resetFields, setValues }
}
