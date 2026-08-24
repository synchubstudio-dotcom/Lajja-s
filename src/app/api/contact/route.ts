import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, message: "Please provide your name, phone number, and message." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been sent to our Vadodara kitchen team. We will contact you shortly!",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to submit inquiry." },
      { status: 500 }
    );
  }
}
