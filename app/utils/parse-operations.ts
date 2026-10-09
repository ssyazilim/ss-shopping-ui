export const convertJSON = (json: string) => {
  const raw = (json ?? "").trim()
  if (!raw.startsWith("{") && !raw.startsWith("[")) return null

  try {
    return JSON.parse(raw)
  } catch (e) {
    Logger.error(e)
    return null
  }
}
export const parseJWT = (token: string) => {
  const base64Url = token.split(".")[1] || ""
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join("")
  )
  return convertJSON(jsonPayload)
}
