import { test, expect } from "@playwright/test";
import { isAuthenticated } from "./helpers";

test.use({ storageState: "e2e/.auth/user.json" });

test.beforeEach(async () => {
  test.skip(!isAuthenticated(), "Skipped — database unavailable for authentication");
});

test.describe("User profile", () => {
  test("can navigate to own profile via sidebar", async ({ page }) => {
    await page.goto("/");

    // Click the Profile nav item in the sidebar
    await page.getByText("Profile").first().click();

    // Should navigate to /username page
    await page.waitForURL(/\/e2e_testuser/, { timeout: 10000 });

    // Profile shows username
    await expect(page.getByText("@e2e_testuser").first()).toBeVisible();
  });

  test("profile page shows user metadata", async ({ page }) => {
    await page.goto("/e2e_testuser");

    // Wait for profile to load
    await expect(page.getByText("@e2e_testuser").first()).toBeVisible({
      timeout: 10000,
    });

    // Should show "Edit profile" button since this is our own profile
    await expect(
      page.getByText("Edit profile").first()
    ).toBeVisible();

    // Should show follower/following stats
    await expect(page.getByText(/Following/).first()).toBeVisible();
    await expect(page.getByText(/Followers/).first()).toBeVisible();
  });

  test("can open edit profile modal", async ({ page }) => {
    await page.goto("/e2e_testuser");

    // Wait for profile to load
    await expect(page.getByText("@e2e_testuser").first()).toBeVisible({
      timeout: 10000,
    });

    // Click Edit profile
    await page.getByText("Edit profile").first().click();

    // Modal should open with a Name input
    await expect(page.getByPlaceholder("Name").first()).toBeVisible({
      timeout: 5000,
    });
  });

  test("profile page shows back button", async ({ page }) => {
    await page.goto("/e2e_testuser");

    // Wait for profile to load
    await expect(page.getByText("@e2e_testuser").first()).toBeVisible({
      timeout: 10000,
    });

    // Back button (arrow) should be present in the page head
    // The PageHead component renders a back button SVG when backBtn is true
    const backButton = page.locator(".hover-main").first();
    await expect(backButton).toBeVisible();
  });
});
