import { NextResponse } from "next/server";

const MAX_NAME_LENGTH = 100;
const MAX_PHONE_LENGTH = 30;
const MAX_EMAIL_LENGTH = 254;
const MAX_CITY_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 1000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text.length <= maxLength ? text : null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Please submit a valid inquiry." },
      { status: 400 }
    );
  }

  if (!isRecord(body)) {
    return NextResponse.json(
      { success: false, message: "Please submit a valid inquiry." },
      { status: 400 }
    );
  }

  const name = readText(body.name, MAX_NAME_LENGTH);
  const phone = readText(body.phone, MAX_PHONE_LENGTH);
  const email = readText(body.email ?? "", MAX_EMAIL_LENGTH);
  const city = readText(body.city ?? "", MAX_CITY_LENGTH);
  const subject = readText(body.subject ?? "", MAX_SUBJECT_LENGTH);
  const message = readText(body.message, MAX_MESSAGE_LENGTH);

  if (
    !name ||
    !phone ||
    !message ||
    email === null ||
    city === null ||
    subject === null ||
    !/^\+?[\d\s().-]+$/.test(phone) ||
    phone.replace(/\D/g, "").length < 7 ||
    phone.replace(/\D/g, "").length > 15 ||
    (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  ) {
    return NextResponse.json(
      { success: false, message: "Please check your name, phone number, email, and message." },
      { status: 400 }
    );
  }

  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = process.env.WHATSAPP_RECIPIENT_PHONE_NUMBER;
  const apiVersion = process.env.WHATSAPP_GRAPH_API_VERSION;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const templateLanguage = process.env.WHATSAPP_TEMPLATE_LANGUAGE;

  if (
    !accessToken ||
    !phoneNumberId ||
    !recipient ||
    !apiVersion ||
    !templateName ||
    !templateLanguage
  ) {
    return NextResponse.json(
      { success: false, message: "Inquiry notifications are temporarily unavailable. Please call or WhatsApp us directly." },
      { status: 503 }
    );
  }

  const recipientNumber = recipient.replace(/\D/g, "");
  if (
    !/^\d{7,15}$/.test(recipientNumber) ||
    !/^v\d+\.\d+$/.test(apiVersion) ||
    !/^[a-z0-9_]{1,512}$/.test(templateName) ||
    !/^[a-z]{2}_[A-Z]{2}$/.test(templateLanguage)
  ) {
    console.error("WhatsApp contact notification configuration is invalid.");
    return NextResponse.json(
      { success: false, message: "Inquiry notifications are temporarily unavailable. Please call or WhatsApp us directly." },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/${apiVersion}/${encodeURIComponent(phoneNumberId)}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: recipientNumber,
          type: "template",
          template: {
            name: templateName,
            language: { code: templateLanguage },
            components: [
              {
                type: "body",
                parameters: [name, phone, email || "Not provided", city || "Not provided", subject || "General Inquiry", message].map((text) => ({
                  type: "text",
                  text,
                })),
              },
            ],
          },
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      console.error(`WhatsApp inquiry notification failed with status ${response.status}.`);
      return NextResponse.json(
        { success: false, message: "We could not send your inquiry right now. Please try again or contact us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been sent to our Vadodara kitchen team. We will contact you shortly!",
    });
  } catch (error) {
    console.error("WhatsApp inquiry notification request failed:", error);
    return NextResponse.json(
      { success: false, message: "We could not send your inquiry right now. Please try again or contact us directly." },
      { status: 502 }
    );
  }
}
