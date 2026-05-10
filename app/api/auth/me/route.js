// Get Current User API Route
// Returns the authenticated user's data

import { getUserFromToken } from "@/lib/session.js";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return Response.json({ error: "کاربر وارد نشده است" }, { status: 401 });
    }

    return Response.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("خطا در دریافت اطلاعات کاربر:", error);
    return Response.json({ error: "خطا در سیستم" }, { status: 500 });
  }
}
