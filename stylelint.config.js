/** @type {import("stylelint").Config} */
export default {
  extends: "stylelint-config-sweet",
  rules: {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"]
      }
    ]
  },
  ignoreFiles: [
    "**/node_modules/**",
    "**/build/**",
    "**/.svelte-kit/**"
  ]
};
