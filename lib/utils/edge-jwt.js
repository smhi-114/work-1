// Edge-safe JWT helpers for middleware.

import { jwtVerify } from "jose/jwt/verify";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-here-change-in-production";
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export async function verifyTokenEdge(token) {
  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    return payload;
  } catch (error) {
    return null;
  }
}
