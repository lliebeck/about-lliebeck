import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");

// Handles POST requests to /api
export async function POST(request: NextRequest) {
  const username = process.env.SMTP_EMAIL;
  const password = process.env.SMTP_PASSWORD;
  const myEmail = process.env.MY_EMAIL;
  const smtpServer = process.env.SMTP_HOST;
  const smtpPort = Number.parseInt(process.env.SMTP_PORT ?? "");

  console.log("dealing with request");
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
      html: `<div>
              <h1>${name} wants to get in touch with you!</h1>
              <h3> You can reach him/her at this email: ${email}</h3>
              <h3>Him/her left you a message:</h3>
              <p>"${message}"</p>
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
