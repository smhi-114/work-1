// Session Management
// Handle JWT token storage in cookies

import { cookies } from "next/headers";

export async function setAuthToken(token, options = {}) {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    ...options,
  });
}

export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value;
}

export async function removeAuthToken() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}

export async function getUserFromToken() {
  const token = await getAuthToken();
  if (!token) return null;

  // Import verifyToken dynamically to avoid circular dependencies
  const { verifyToken } = await import("@/lib/utils/jwt.js");
  return verifyToken(token);
}
