import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");

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
  const username = process.env.SMTP_EMAIL;
  const password = process.env.SMTP_PASSWORD;
  const myEmail = process.env.MY_EMAIL;
  const smtpServer = process.env.SMTP_HOST;
  const smtpPort = Number.parseInt(process.env.SMTP_PORT ?? "");

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

  // create transporter object
  const transporter = nodemailer.createTransport({
    host: smtpServer,
    port: smtpPort,
    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    const mail = await transporter.sendMail({
      from: username,
      to: myEmail,
      replyTo: email,
      subject: `${name} has contacted you via your portfolio`,
      html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <h1 style="color: #007BFF;">${name} wants to get in touch with you!</h1>
              <h3>You can reach ${name} by email at <a href="mailto:${email}" style="color: #007BFF;">${email}</a></h3>
              <h3>He/She left you the following message:</h3>
              <p style="background-color: #f9f9f9; padding: 15px; border-left: 5px solid #007BFF; white-space: pre-wrap;">"${message}"</p>
            </div>`,
    });

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "COULD NOT SEND MESSAGE" },
      { status: 500 }
    );
  }
}
