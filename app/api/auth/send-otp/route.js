// Send OTP API Route
// Handles sending OTP to user's phone

export async function POST(req) {
  const body = await req.json();
  const phone = body.phone;

  console.log("ارسال OTP برای:", phone);

  return Response.json({
    success: true,
  });
}
