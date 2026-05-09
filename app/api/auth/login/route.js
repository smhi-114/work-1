// Login API Route
// Handles user login with email/phone and password

export async function POST(request) {
  try {
    const { email, phone, password } = await request.json();

    // Validate input
    if (!email && !phone) {
      return new Response(
        JSON.stringify({ error: "Email or phone number is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!password) {
      return new Response(JSON.stringify({ error: "Password is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // TODO: Verify credentials against database
    // Check if user exists and password matches

    // TODO: Generate JWT token upon successful login
    // const token = jwt.sign({ userId, email, phone }, process.env.JWT_SECRET);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful",
        // In production, remove this debug line
        debugToken: "jwt_token_placeholder",
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
