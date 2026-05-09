// Register API Route
// Handles new user registration

export async function POST(request) {
  try {
    const { name, email, phone, password } = await request.json();

    // Validate input
    if (!name || !email || !phone || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // TODO: Check if user already exists
    // Check if email or phone is already registered

    // TODO: Hash the password before storing
    // const hashedPassword = await bcrypt.hash(password, 10);

    // TODO: Store new user in database
    // const newUser = await db.user.create({ ... });

    // TODO: Generate JWT token for the new user
    // const token = jwt.sign({ userId: newUser.id, email, phone }, process.env.JWT_SECRET);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Registration successful",
        // In production, remove this debug line
        debugUser: { name, email, phone },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
