import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([
    ...compat.extends("standard", "prettier"),
    {
        plugins: {
            prettier,
        },

        languageOptions: {
            globals: {
                ...globals.node,
            },
        },

        rules: {
            "import/no-dynamic-require": 0,
            "global-require": 0,
            "class-methods-use-this": 0,
        },
    },
]);