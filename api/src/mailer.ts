import Email from "email-templates";
import nodemailer from "nodemailer";
import { config } from "./config";

import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

// Create functions for email confirmation
export async function sendEmailConfirmation(
  to: string,
  username: string,
  confirmationUrl: string
) {
  await sendEmail("email_confirmation", to, {
    username: username,
    confirmationUrl: confirmationUrl,
  });
}

export async function sendPasswordReset(
  to: string,
  username: string,
  resetUrl: string
) {
  await sendEmail("reset_password", to, {
    username: username,
    resetUrl: resetUrl,
  });
}

async function sendEmail(
  template: string,
  to: string,
  locals: { [key: string]: string }
) {
  let transporter: any;
  if (
    config.OAUTH_CLIENT_ID != undefined &&
    config.OAUTH_CLIENT_ID != null &&
    config.OAUTH_CLIENT_ID != ""
  ) {
    // setup later
    const OAuth2Client = new OAuth2(
      config.OAUTH_CLIENT_ID,
      config.SMTP_SERVICE_CLIENT
    );

    OAuth2Client.setCredentials({
      refresh_token: config.OAUTH_REFRESH_TOKEN,
    });

    const accessToken = (await OAuth2Client.getAccessToken()).token!;

    transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: true, // upgrade later with STARTTLS
      auth: {
        type: "OAuth2",
        user: config.SMTP_AUTH_USER!,
        clientId: config.OAUTH_CLIENT_ID!,
        clientSecret: config.OAUTH_CLIENT_SECRET!,
        refreshToken: config.OAUTH_REFRESH_TOKEN!,
        accessToken: accessToken,
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_SECURE, // upgrade later with STARTTLS
      auth: {
        user: config.SMTP_AUTH_USER,
        pass: config.SMTP_AUTH_PASSWORD,
      },
    });
  }

  const email = new Email({
    message: {
      from: `${config.SMTP_FROM_NAME} <${config.SMTP_FROM_EMAIL}>`,
    },
    send: true,
    transport: transporter,
  });

  await email.send({
    template: template,
    message: {
      to: to,
    },
    locals: locals,
  });
}
