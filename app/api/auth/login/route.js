// Login API Route
// Handles user login with email/phone and password

import { findUserByPhone, findUserByEmail } from "@/lib/models/User.js";
import { comparePassword } from "@/lib/utils/password.js";
import { generateToken } from "@/lib/utils/jwt.js";

export async function POST(request) {
  try {
    const { email, phone, password } = await request.json();

    if (!email && !phone) {
      return Response.json(
        { error: "شماره موبایل یا ایمیل الزامی است" },
        { status: 400 }
      );
    }

    if (!password) {
      return Response.json({ error: "رمز عبور الزامی است" }, { status: 400 });
    }

    // Find user by phone or email
    let user;
    if (phone) {
      user = await findUserByPhone(phone);
    } else {
      user = await findUserByEmail(email);
    }

    if (!user) {
      return Response.json({ error: "کاربر یافت نشد" }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return Response.json({ error: "رمز عبور اشتباه است" }, { status: 401 });
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id,
      phone: user.phone,
      email: user.email,
      name: user.name,
    });

    return Response.json({
      success: true,
      message: "ورود با موفقیت انجام شد",
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("خطا در ورود:", error);
    return Response.json(
      { error: "خطا در سیستم، لطفاً دوباره تلاش کنید" },
      { status: 500 }
    );
  }
}
