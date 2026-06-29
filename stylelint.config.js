/** @type {import("stylelint").Config} */
export default {
  extends: "stylelint-config-sweet",
  ignoreFiles: [
    "**/node_modules/**",
    "**/build/**",
    "**/.svelte-kit/**"
  ]
};
