// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";

export default defineConfig([
  {
    ignores: ["dist", "build", "node_modules", ".vite"],
  },

  // JS
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },

  // Configs
  {
    files: ["**/eslint.config.js", "**/prettier.config.js"],
    languageOptions: {
      sourceType: "module",
    },
  },
]);
