const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
  {
    ignores: [
      ".next/",
      "node_modules/",
      "out/",
      "build/",
      "*.config.js",
      "*.config.cjs",
      "postcss.config.cjs",
      "prettier.config.cjs",
      "tailwind.config.cjs",
    ],
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-require-imports": "off",
    },
  }
);
