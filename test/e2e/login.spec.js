import { test, expect } from "@playwright/test";

test("login page loads and user can log in", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.fill('input[name="email"]', "e2etest@stud.noroff.no");
  await page.fill('input[name="password"]', "abc123123");

  await page.click('button[type="submit"]');

  // Option 1: Use absolute URL
  await expect(page).toHaveURL("http://localhost:5173");

  // Option 2: Use regex to allow relative or absolute
  await expect(page).toHaveURL(/\/$/);

  await expect(page.locator("text=Login successful!")).toBeVisible();
});
