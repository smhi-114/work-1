// Register API Route
// Handles new user registration with password hashing

import {
  createUser,
  findUserByPhone,
  findUserByEmail,
} from "@/lib/models/User.js";
import { hashPassword, validatePassword } from "@/lib/utils/password.js";
import { generateToken } from "@/lib/utils/jwt.js";

export async function POST(request) {
  try {
    const { name, phone, password, email } = await request.json();

    // Validate required fields
    if (!name || !phone || !password) {
      return Response.json(
        { error: "نام، شماره موبایل و رمز عبور الزامی است" },
        { status: 400 }
      );
    }

    // Validate phone number format
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return Response.json(
        { error: "فرمت شماره موبایل نامعتبر است" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (!validatePassword(password)) {
      return Response.json(
        {
          error:
            "رمز عبور باید حداقل ۸ کاراکتر باشد و شامل حروف بزرگ، کوچک و عدد باشد",
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUserByPhone = await findUserByPhone(phone);
    if (existingUserByPhone) {
      return Response.json(
        { error: "این شماره موبایل قبلاً ثبت شده است" },
        { status: 400 }
      );
    }

    let existingUserByEmail = null;
    if (email) {
      existingUserByEmail = await findUserByEmail(email);
      if (existingUserByEmail) {
        return Response.json(
          { error: "این ایمیل قبلاً ثبت شده است" },
          { status: 400 }
        );
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const userId = await createUser({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = generateToken({ userId, phone, email });

    return Response.json(
      {
        success: true,
        message: "ثبت‌نام با موفقیت انجام شد",
        token,
        user: {
          id: userId,
          name,
          phone,
          email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("خطا در ثبت‌نام:", error);
    return Response.json(
      { error: "خطا در سیستم، لطفاً دوباره تلاش کنید" },
      { status: 500 }
    );
  }
}
