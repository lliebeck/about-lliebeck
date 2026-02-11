import { NextRequest, NextResponse } from "next/server";
import EmailTemplate from "../../[locale]/components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const idToRequestCount = new Map<string, number>();
const rateLimiter = {
  windowStart: Date.now(),
  windowSize: 60000, // 60.000 Milliseconds = 1 Minute
  maxRequests: 5, // 5 Requests per Minute
};

const limit = (ip: string) => {
  // Check and update current window
  const now = Date.now();
  const isNewWindow = now - rateLimiter.windowStart > rateLimiter.windowSize;
  if (isNewWindow) {
    rateLimiter.windowStart = now;
    idToRequestCount.set(ip, 0);
  }

  // Check and update current request limits
  const currentRequestCount = idToRequestCount.get(ip) ?? 0;
  if (currentRequestCount >= rateLimiter.maxRequests) return true;
  idToRequestCount.set(ip, currentRequestCount + 1);

  return false;
};

// Handles POST requests to /api
export async function POST(request: NextRequest) {
  const email_from = process.env.EMAIL_FROM;
  const email_to = process.env.EMAIL_TO;

  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("X-Forwarded-For") ??
    "unknown";
  const isRateLimited = limit(ip);

  if (isRateLimited)
    return NextResponse.json({ error: "rate limited" }, { status: 429 });

  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  try {
    const { data, error } = await resend.emails.send({
      from: `Portfolio <${email_from}>`,
      to: [`${email_to}`],
      subject: `${name} has contacted you via your portfolio`,
      react: EmailTemplate({
        name: `${name}`,
        email: `${email}`,
        message: `${message}`,
      }),
    });

    if (error) {
      return NextResponse.json(
        { message: "COULD NOT SEND MESSAGE" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "COULD NOT SEND MESSAGE" },
      { status: 500 }
    );
  }
}
