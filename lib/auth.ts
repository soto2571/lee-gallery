/**
 * Minimal gate for the admin panel — a single shared login, no user accounts.
 *
 * The password lives in env vars in production (ADMIN_USER / ADMIN_PASSWORD /
 * ADMIN_SECRET); the defaults below are the local-dev fallback. The session is
 * a signed cookie, so it can't be forged by editing it in the browser.
 *
 * Only Web Crypto is used here, no node:crypto — this module has to run in
 * middleware (Edge runtime) as well as in server actions.
 */
export const SESSION_COOKIE = "lee_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const ADMIN_USER = process.env.ADMIN_USER ?? "ShayAdmin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Password!234";
const SECRET = process.env.ADMIN_SECRET ?? "lee-gallery-dev-secret-change-me";

async function hmac(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function checkCredentials(user: string, password: string) {
  return user === ADMIN_USER && password === ADMIN_PASSWORD;
}

export async function createSessionToken() {
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  return `${expires}.${await hmac(String(expires))}`;
}

export async function verifySessionToken(token: string | undefined | null) {
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (Number(expires) < Date.now()) return false;
  return signature === (await hmac(expires));
}
