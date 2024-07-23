import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";
dotenv.config();

const requiredEnvVars = [
  "JWT_SECRET",
  "DATABASE_URL",
  "CORS_ALLOWED_ORIGIN",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_AUTH_USER",
  "SMTP_AUTH_PASSWORD",
  "SMTP_FROM_EMAIL",
  "SMTP_FROM_NAME",
  "PASSWORD_RESET_URL",
  "EMAIL_CONFIRMATION_URL",
  // Optional environment variables
  "SMTP_AUTH_TYPE",
  "SMTP_SERVICE_CLIENT",
  "SMTP_PRIVATE_KEY",
  "OAUTH_REFRESH_TOKEN",
  "OAUTH_CLIENT_ID",
  "OAUTH_CLIENT_SECRET"
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName] && !["SMTP_AUTH_TYPE", "SMTP_SERVICE_CLIENT", "SMTP_PRIVATE_KEY", "OAUTH_REFRESH_TOKEN", "OAUTH_CLIENT_ID", "OAUTH_CLIENT_SECRET"].includes(varName)) {
    throw new Error(
      `Environment variable ${varName} is required but was not found.`
    );
  }
});

const secret: Secret = process.env.JWT_SECRET as Secret;

const port = process.env.PORT ? parseInt(process.env.PORT) || 8080 : 8080;

const corsAllowedOrigins = process.env.CORS_ALLOWED_ORIGIN!.split(",");

interface Config {
  DATABASE_URL: string;
  JWT_SECRET: Secret;
  PORT: number;
  CORS_ALLOWED_ORIGINS: string[];
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_SECURE: boolean;
  SMTP_AUTH_USER: string;
  SMTP_AUTH_PASSWORD: string;
  SMTP_FROM_EMAIL: string;
  SMTP_FROM_NAME: string;
  PASSWORD_RESET_URL: string;
  EMAIL_CONFIRMATION_URL: string;
  SMTP_AUTH_TYPE?: string;
  SMTP_SERVICE_CLIENT?: string;
  SMTP_PRIVATE_KEY?: string;
  OAUTH_REFRESH_TOKEN?: string;
  OAUTH_CLIENT_ID?: string;
  OAUTH_CLIENT_SECRET?: string;
}

export const config: Config = {
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: secret,
  PORT: port,
  CORS_ALLOWED_ORIGINS: corsAllowedOrigins,
  SMTP_HOST: process.env.SMTP_HOST!,
  SMTP_PORT: parseInt(process.env.SMTP_PORT!),
  SMTP_SECURE: process.env.SMTP_SECURE === "true",
  SMTP_AUTH_USER: process.env.SMTP_AUTH_USER!,
  SMTP_AUTH_PASSWORD: process.env.SMTP_AUTH_PASSWORD!,
  SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL!,
  SMTP_FROM_NAME: process.env.SMTP_FROM_NAME!,
  PASSWORD_RESET_URL: process.env.PASSWORD_RESET_URL!,
  EMAIL_CONFIRMATION_URL: process.env.EMAIL_CONFIRMATION_URL!,
  SMTP_AUTH_TYPE: process.env.SMTP_AUTH_TYPE,
  SMTP_SERVICE_CLIENT: process.env.SMTP_SERVICE_CLIENT,
  SMTP_PRIVATE_KEY: process.env.SMTP_PRIVATE_KEY,
  OAUTH_REFRESH_TOKEN: process.env.OAUTH_REFRESH_TOKEN,
  OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET
};

export function formatPasswordResetUrl(token: string): string {
  return `${config.PASSWORD_RESET_URL}?token=${token}`;
}

export function formatEmailConfirmationUrl(token: string): string {
  return `${config.EMAIL_CONFIRMATION_URL}?token=${token}`;
}