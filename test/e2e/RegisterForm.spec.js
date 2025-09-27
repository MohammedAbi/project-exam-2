import { test, expect } from "@playwright/test";

test("register page loads and user can register", async ({ page }) => {
  await page.goto("http://localhost:5173/register");

  // Fill required fields
  await page.fill('input[name="name"]', "E2etestuser123126");
  await page.fill('input[name="email"]', "E2etestuser123126@stud.noroff.no");
  await page.fill('input[name="password"]', "abc123126");
  await page.fill('input[name="confirmPassword"]', "abc123126");

  // Optional fields
  await page.fill(
    'textarea[name="bio"]',
    "I am a test user created for E2E testing."
  );
  await page.fill(
    'input[name="avatarUrl"]',
    "https://images.unsplash.com/photo-1590845947670-c009801ffa74?q=80&w=3259&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  await page.fill('input[name="avatarAlt"]', "Test avatar");
  await page.fill(
    'input[name="bannerUrl"]',
    "https://images.unsplash.com/photo-1590845947670-c009801ffa74?q=80&w=3259&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  await page.fill('input[name="bannerAlt"]', "Test banner");

  // Check venue manager if needed
  await page.check('input[name="venueManager"]');

  // Submit form
  await page.click('button[type="submit"]');

  // Wait for navigation or success toast
  await expect(page).toHaveURL("http://localhost:5173/login");
  await expect(page.locator("text=Registration successful!")).toBeVisible();
});
