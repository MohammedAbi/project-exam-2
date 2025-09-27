import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // 👇 Point exactly to your e2e folder
  testDir: "./test/e2e",
  // 👇 Only run spec.js files
  testMatch: ["**/*.spec.js"],

  timeout: 30 * 1000,
  retries: 0,
  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
