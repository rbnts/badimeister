import sweet from "eslint-config-sweet";
import svelte from "eslint-plugin-svelte";
import { defineConfig } from "eslint/config";
import globals from "globals";
import ts from "typescript-eslint";
import svelteConfig from "./svelte.config.js";

export default defineConfig(
  sweet,
  {
    files: ["**/*.svelte", "**/*.svelte.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: [".svelte"],
        parser: ts.parser,
        svelteConfig
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        App: "readonly"
      }
    },
    extends: [svelte.configs.recommended],
    rules: {
      "unicorn/prefer-global-this": 0,
      "unicorn/prevent-abbreviations": 0,
      "@typescript-eslint/init-declarations": 0,

      "svelte/no-add-event-listener": "error",
      "svelte/no-top-level-browser-globals": "error",
      "svelte/require-event-prefix": "error",
      "svelte/no-target-blank": "error",
      "svelte/button-has-type": "error",
      "svelte/prefer-const": "error",
      "svelte/block-lang": [
        "error",
        {
          script: "ts",
          style: "scss"
        }
      ],
      "svelte/indent": "error",
      "svelte/first-attribute-linebreak": "error",
      "svelte/html-closing-bracket-new-line": "error",
      "svelte/html-closing-bracket-spacing": "error",
      "svelte/html-quotes": "error",
      "svelte/html-self-closing": "error",
      "svelte/mustache-spacing": "error",
      "svelte/no-extra-reactive-curlies": "error",
      "svelte/no-spaces-around-equal-signs-in-attribute": "error",
      "svelte/prefer-class-directive": "error",
      "svelte/prefer-style-directive": "error",
      "svelte/require-optimized-style-attribute": "error",
      "svelte/shorthand-attribute": "error",
      "svelte/shorthand-directive": "error",
      "svelte/sort-attributes": "error",
      "svelte/spaced-html-comment": "error"
    }
  }
);
