import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// Safety net for direct `eslint .` invocations. The package script scopes to
// `src` and `tests`, so generated artifacts and other tooling directories
// outside that scope never see ESLint regardless.
const config = [
  {
    ignores: ["**/.next/**", "**/node_modules/**", "next-env.d.ts"],
  },
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default config;
