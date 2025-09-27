// import { defineConfig } from "vitest/config";

// export default defineConfig({
//   test: {
//     environment: "jsdom",
//     globals: true,
//     setupFiles: "./vitest.setup.js",
//   },
// });
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.js",
    include: [
      "test/components/**/*.test.{js,jsx,ts,tsx}",
      "test/components/integration/**/*.test.{js,jsx,ts,tsx}",
    ],
    exclude: ["test/e2e/**"],
  },
});
