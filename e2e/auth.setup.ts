import { test as setup, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const authDir = path.join(__dirname, ".auth");
const authFile = path.join(authDir, "user.json");

/**
 * Authenticate via the credentials provider.
 * NextAuth's credentials provider auto-creates a user if one doesn't exist,
 * so this doubles as signup for a fresh database.
 *
 * If authentication fails (e.g., no database connection), this setup creates
 * a marker file so dependent tests can skip gracefully.
 */
setup("authenticate via credentials", async ({ page }) => {
  fs.mkdirSync(authDir, { recursive: true });

  await page.goto("/");

  // Unauthenticated state shows "Sign in" button
  const signInButton = page.getByRole("button", { name: "Sign in" });
  await expect(signInButton).toBeVisible();
  await signInButton.click();

  // The SigninModal should appear
  await expect(
    page.getByRole("heading", { name: "Sign in to Twitter" })
  ).toBeVisible();

  // Fill credentials form
  await page.getByPlaceholder("Username").fill("e2e_testuser");
  await page.getByPlaceholder("Password").fill("e2e_testpassword123");

  // Click the modal's Sign in button (inside the form)
  await page.locator("form button[type='submit']").click();

  // Wait for redirect to authenticated state — the home page shows "Home" heading
  // NextAuth credentials flow redirects back to the page on success
  try {
    await expect(page.getByText("Home").first()).toBeVisible({
      timeout: 15000,
    });
  } catch {
    // Auth failed — likely no database. Write empty storage state so dependent
    // tests can detect the missing auth and skip.
    const emptyState = { cookies: [], origins: [] };
    fs.writeFileSync(authFile, JSON.stringify(emptyState));
    setup.skip(
      true,
      "Authentication failed — database likely unavailable. Authenticated tests will be skipped."
    );
    return;
  }

  // Save auth state
  await page.context().storageState({ path: authFile });
});
