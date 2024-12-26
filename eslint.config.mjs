import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disallow the use of `any` type
      "@typescript-eslint/no-explicit-any": "warn", // Change "warn" to "error" if you want stricter enforcement

      // Prevent variables that are assigned but never used
      "no-unused-vars": [
        "warn", // Change to "error" for stricter enforcement
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],

      // Prevent unused assignments
      "@typescript-eslint/no-unused-vars": [
        "warn", // Change to "error" for stricter enforcement
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;
