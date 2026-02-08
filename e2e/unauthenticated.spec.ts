import { test, expect } from "@playwright/test";

test.describe("Unauthenticated user experience", () => {
  test("shows sign-in page with CTA", async ({ page }) => {
    await page.goto("/");

    // Should show the sign-in landing page
    await expect(
      page.getByText("See what's happening in the world right now")
    ).toBeVisible();
    await expect(page.getByText("Join Twitter today.")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Sign in" })
    ).toBeVisible();
  });

  test("shows sign-in modal with providers when Sign in is clicked", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Sign in" }).click();

    // Modal appears with heading
    await expect(
      page.getByRole("heading", { name: "Sign in to Twitter" })
    ).toBeVisible();

    // OAuth provider buttons
    await expect(
      page.getByRole("button", { name: /Sign in with Github/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Sign in with Google/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Sign in with Discord/i })
    ).toBeVisible();

    // Credentials form
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();

    // Account creation note
    await expect(
      page.getByText("If you don't have an account. We'll create one for you.")
    ).toBeVisible();
  });

  test("page title is Sign In when unauthenticated", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Sign In");
  });

  test("all routes redirect to sign-in when unauthenticated", async ({
    page,
  }) => {
    // Navigating to any route should show the sign-in page
    for (const route of ["/home", "/bookmarks", "/settings", "/messages"]) {
      await page.goto(route);
      await expect(
        page.getByText("See what's happening in the world right now")
      ).toBeVisible();
    }
  });
});
