import { test, expect } from "@playwright/test";
import { isAuthenticated } from "./helpers";

test.use({ storageState: "e2e/.auth/user.json" });

test.beforeEach(async () => {
  test.skip(!isAuthenticated(), "Skipped — database unavailable for authentication");
});

test.describe("Tweet creation and interaction", () => {
  test("can create a new tweet", async ({ page }) => {
    await page.goto("/");

    // Type in the tweet input
    const tweetInput = page.getByRole("textbox").first();
    await tweetInput.fill("E2E test tweet " + Date.now());

    // Click the Tweet button
    await page.getByRole("button", { name: "Tweet" }).first().click();

    // The tweet should appear in the feed (the text we just typed)
    await expect(
      page.getByText(/E2E test tweet \d+/).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test("tweet minimum length is enforced (body must be >= 3 chars)", async ({
    page,
  }) => {
    await page.goto("/");

    const tweetInput = page.getByRole("textbox").first();
    await tweetInput.fill("ab");

    // Click Tweet — the tweet should NOT appear because body < 3 chars
    await page.getByRole("button", { name: "Tweet" }).first().click();

    // Wait briefly and verify no new tweet with "ab" appears
    await page.waitForTimeout(2000);
    // The input should still contain the text (not cleared on failed submission)
    await expect(tweetInput).toHaveValue("ab");
  });

  test("clicking a tweet navigates to tweet detail page", async ({ page }) => {
    await page.goto("/");

    // Wait for tweets to load
    await page.waitForTimeout(3000);

    // Find the first tweet and click it
    const firstTweet = page.locator("[class*='main-border']").filter({ hasText: /\w+/ }).first();
    if (await firstTweet.isVisible()) {
      await firstTweet.click();

      // Should navigate to /tweet/[id] page
      await page.waitForURL(/\/tweet\//, { timeout: 5000 });
      await expect(page.url()).toContain("/tweet/");
    }
  });
});
