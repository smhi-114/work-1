// Send OTP API Route
// Handles sending OTP to user's phone and storing in MongoDB

import { createOtp } from "@/lib/models/Otp.js";

export async function POST(req) {
  try {
    const body = await req.json();
    const phone = body.phone;

    if (!phone) {
      return Response.json(
        { error: "شماره موبایل الزامی است" },
        { status: 400 }
      );
    }

    // Validate phone number format (Iranian phone numbers)
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return Response.json(
        { error: "فرمت شماره موبایل نامعتبر است" },
        { status: 400 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in MongoDB
    await createOtp({ phone, otp });

    console.log("OTP ارسال شد برای:", phone, "کد:", otp);

    // In production, send OTP via SMS service (Kavenegar)
    // TODO: Use kavenegar API to send SMS

    return Response.json({
      success: true,
      message: "کد تایید ارسال شد",
    });
  } catch (error) {
    console.error("خطا در ارسال OTP:", error);
    return Response.json(
      { error: "خطا در سیستم، لطفاً دوباره تلاش کنید" },
      { status: 500 }
    );
  }
}
