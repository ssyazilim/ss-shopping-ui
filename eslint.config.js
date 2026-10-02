import { createConfigForNuxt } from "@nuxt/eslint-config"
import { FlatCompat } from "@eslint/eslintrc"
import { fixupConfigRules } from "@eslint/compat"
import jsonc from "eslint-plugin-jsonc"
import yml from "eslint-plugin-yml"
import prettierRecommended from "eslint-plugin-prettier/recommended"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default createConfigForNuxt(
  {},
  {
    name: "project/ignores",
    ignores: [
      "**/node_modules/**",
      "**/.nuxt/**",
      "**/.output/**",
      "**/.cache/**",
      ".idea/**",
      "pnpm-lock.yaml",
    ],
  },

  ...fixupConfigRules(compat.extends("plugin:tailwindcss/recommended")).map((config) => ({
    ...config,
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,vue}"],
  })),

  ...jsonc.configs["recommended-with-jsonc"],
  ...jsonc.configs.prettier,

  ...yml.configs.standard,
  ...yml.configs.prettier,

  {
    name: "project/rules",
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    rules: {
      "no-var": "error",
      "no-const-assign": "error",
      "no-unused-vars": "off",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",

      "vue/multi-word-component-names": "off",
      "vue/padding-line-between-blocks": ["error", "always"],
      "vue/html-self-closing": "off",
      "vue/max-attributes-per-line": "off",
    },
  },

  prettierRecommended
)
