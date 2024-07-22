import Email from "email-templates";
import nodemailer from "nodemailer";
import { config } from "./config";


const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_SECURE, // upgrade later with STARTTLS
    auth: {
      user: config.SMTP_AUTH_USER,
      pass: config.SMTP_AUTH_PASSWORD,
    },
});

const email = new Email({
  message: {
    from: `${config.SMTP_FROM_NAME} <${config.SMTP_FROM_EMAIL}>`,
  },
  send: true,
  transport: transporter,
});

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
  await email.send({
    template: template,
    message: {
      to: to,
    },
    locals: locals,
  });
}
