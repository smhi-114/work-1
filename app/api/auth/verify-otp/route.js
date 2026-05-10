// Verify OTP API Route
// Validates the OTP sent to user and generates JWT token

import { verifyOtp } from '@/lib/models/Otp.js';
import { generateToken } from '@/lib/utils/jwt.js';

export async function POST(req) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return Response.json(
        { error: 'شماره موبایل و کد تایید الزامی است' },
        { status: 400 }
      );
    }

    // Verify OTP
    const verifiedOtp = await verifyOtp(phone, otp);

    if (!verifiedOtp) {
      return Response.json(
        { error: 'کد تایید نامعتبر یا منقضی شده است' },
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = generateToken({ phone });

    return Response.json({
      success: true,
      message: 'کد تایید صحیح است',
      token,
    });
  } catch (error) {
    console.error('خطا در تایید OTP:', error);
    return Response.json(
      { error: 'خطا در سیستم، لطفاً دوباره تلاش کنید' },
      { status: 500 }
    );
  }
}
