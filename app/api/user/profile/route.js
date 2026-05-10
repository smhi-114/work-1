// User Profile API Route
// Get and update user profile

import { findUserById, updateUser } from "@/lib/models/User.js";
import { getUserFromToken } from "@/lib/session.js";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return Response.json({ error: "کاربر وارد نشده است" }, { status: 401 });
    }

    const userData = await findUserById(user.userId);

    if (!userData) {
      return Response.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

    // Return user data without password
    const { password, ...userDataWithoutPassword } = userData;

    return Response.json({
      success: true,
      user: userDataWithoutPassword,
    });
  } catch (error) {
    console.error("خطا در دریافت اطلاعات کاربر:", error);
    return Response.json({ error: "خطا در سیستم" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return Response.json({ error: "کاربر وارد نشده است" }, { status: 401 });
    }

    const { name, email, phone } = await req.json();

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;

    if (Object.keys(updateData).length === 0) {
      return Response.json(
        { error: "اطلاعات به‌روزرسانی الزامی است" },
        { status: 400 }
      );
    }

    const success = await updateUser(user.userId, updateData);

    if (success) {
      return Response.json({
        success: true,
        message: "اطلاعات با موفقیت بروزرسانی شد",
      });
    } else {
      return Response.json(
        { error: "خطا در بروزرسانی اطلاعات" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("خطا در بروزرسانی اطلاعات کاربر:", error);
    return Response.json({ error: "خطا در سیستم" }, { status: 500 });
  }
}
