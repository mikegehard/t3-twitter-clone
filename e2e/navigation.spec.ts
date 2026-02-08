import { test, expect } from "@playwright/test";
import { isAuthenticated } from "./helpers";

test.use({ storageState: "e2e/.auth/user.json" });

test.beforeEach(async () => {
  test.skip(!isAuthenticated(), "Skipped — database unavailable for authentication");
});

test.describe("Page navigation", () => {
  test("bookmarks page loads with layout", async ({ page }) => {
    await page.goto("/bookmarks");

    // Should render the main layout (sidebar + content)
    await expect(page.getByText("Home").first()).toBeVisible();
  });

  test("settings page loads with layout", async ({ page }) => {
    await page.goto("/settings");

    // Should render the settings content area
    await expect(page.getByText("Home").first()).toBeVisible();
  });

  test("messages page loads with layout", async ({ page }) => {
    await page.goto("/messages");

    // Should render the main layout
    await expect(page.getByText("Home").first()).toBeVisible();
  });

  test("/home and / both render the home feed", async ({ page }) => {
    await page.goto("/home");

    await expect(
      page.locator("h1").filter({ hasText: "Home" }).first()
    ).toBeVisible();

    await page.goto("/");

    await expect(
      page.locator("h1").filter({ hasText: "Home" }).first()
    ).toBeVisible();
  });

  test("sidebar Made by AlandSleman link is visible", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByText("AlandSleman")
    ).toBeVisible();
  });
});
