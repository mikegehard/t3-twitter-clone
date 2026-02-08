import { test, expect } from "@playwright/test";
import { isAuthenticated } from "./helpers";

test.use({ storageState: "e2e/.auth/user.json" });

test.beforeEach(async () => {
  test.skip(!isAuthenticated(), "Skipped — database unavailable for authentication");
});

test.describe("Home feed (authenticated)", () => {
  test("renders home page with navigation and tweet input", async ({
    page,
  }) => {
    await page.goto("/");

    // Page head shows "Home"
    await expect(
      page.locator("h1").filter({ hasText: "Home" }).first()
    ).toBeVisible();

    // Left sidebar navigation items are visible
    await expect(page.getByText("Home").first()).toBeVisible();

    // Tweet input area is present (textarea for composing tweets)
    await expect(
      page.getByRole("textbox").first()
    ).toBeVisible();
  });

  test("shows Tweet button in tweet composer", async ({ page }) => {
    await page.goto("/");

    // Tweet submit button exists in the composer area
    await expect(
      page.getByRole("button", { name: "Tweet" }).first()
    ).toBeVisible();
  });

  test("shows sidebar with Who to follow section", async ({ page }) => {
    await page.goto("/");

    // Right sidebar has "Who to follow" heading (visible on larger viewports)
    await expect(page.getByText("Who to follow")).toBeVisible();
  });

  test("shows search bar in sidebar (disabled)", async ({ page }) => {
    await page.goto("/");

    // Search input exists but is disabled
    const searchInput = page.getByPlaceholder("Search Twitter");
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeDisabled();
  });

  test("left sidebar shows navigation items", async ({ page }) => {
    await page.goto("/");

    // Nav items that should be present
    for (const item of ["Home", "Explore", "Bookmarks", "Settings", "Profile"]) {
      await expect(page.getByText(item).first()).toBeVisible();
    }
  });

  test("left sidebar shows Get Verified option", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Get Verified")).toBeVisible();
  });
});
