// Verify OTP API Route
// Validates the OTP sent to user

export async function POST(request) {
  try {
    const { email, phone, otp } = await request.json();

    // Validate input
    if (!otp) {
      return new Response(JSON.stringify({ error: "OTP is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // TODO: Verify OTP against stored value
    // Check if OTP exists, is not expired, and matches

    // For now, accept any 6-digit OTP
    if (otp.length !== 6 || isNaN(otp)) {
      return new Response(JSON.stringify({ error: "Invalid OTP format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // TODO: Generate JWT token upon successful verification
    // const token = jwt.sign({ email, phone }, process.env.JWT_SECRET);

    return new Response(
      JSON.stringify({
        success: true,
        message: "OTP verified successfully",
        // In production, remove this debug line
        debugValid: true,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
