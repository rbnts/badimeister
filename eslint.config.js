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
      // svelte specifics
      "unicorn/prefer-global-this": "off",
      "unicorn/prevent-abbreviations": "off",
      "@typescript-eslint/init-declarations": "off",

      // correctness
      "svelte/button-has-type": "error",
      "svelte/no-add-event-listener": "error",
      "svelte/no-nested-style-tag": "error",
      "svelte/no-target-blank": "error",
      "svelte/no-top-level-browser-globals": "error",
      "svelte/valid-style-parse": "error",

      // best practices
      "svelte/block-lang": ["error", { script: "ts", style: "scss" }],
      "svelte/no-extra-reactive-curlies": "error",
      "svelte/no-inline-styles": "error",
      "svelte/no-unused-class-name": ["error", { allowedClassNames: ["sr-only"] }],
      "svelte/prefer-class-directive": "error",
      "svelte/prefer-const": "error",
      "svelte/prefer-derived-over-derived-by": "error",
      "svelte/prefer-style-directive": "error",
      "svelte/require-event-prefix": "error",
      "svelte/require-optimized-style-attribute": "error",
      "svelte/shorthand-attribute": "error",
      "svelte/shorthand-directive": "error",

      // formatting
      "svelte/first-attribute-linebreak": "error",
      "svelte/html-closing-bracket-new-line": "error",
      "svelte/html-closing-bracket-spacing": "error",
      "svelte/html-quotes": "error",
      "svelte/html-self-closing": "error",
      "svelte/indent": "error",
      "svelte/mustache-spacing": "error",
      "svelte/no-spaces-around-equal-signs-in-attribute": "error",
      "svelte/sort-attributes": "error",
      "svelte/spaced-html-comment": "error"
    }
  }
);
