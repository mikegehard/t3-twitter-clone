import fs from "fs";
import path from "path";

const authFile = path.join(__dirname, ".auth", "user.json");

/**
 * Returns true if authentication setup succeeded (storage state has cookies).
 * When the database is unavailable, auth.setup.ts writes an empty storage state.
 */
export function isAuthenticated(): boolean {
  try {
    const data = JSON.parse(fs.readFileSync(authFile, "utf-8"));
    return data.cookies && data.cookies.length > 0;
  } catch {
    return false;
  }
}
