import dotenv from "dotenv";
import { string } from "joi";
import { Secret } from "jsonwebtoken";
dotenv.config();

if (
  typeof process.env.JWT_SECRET === "undefined" ||
  process.env.JWT_SECRET === "" ||
  process.env.JWT_SECRET === null) {
  throw new Error(
    "Environment variable JWT_SECRET is required but was not found."
  );
}

if (
  typeof process.env.DATABASE_URL === "undefined" ||
  process.env.DATABASE_URL === "" ||
  process.env.DATABASE_URL === null) {
  throw new Error(
    "Environment variable DATABASE_URL is required but was not found."
  );
}

if (
  typeof process.env.CORS_ALLOWED_ORIGIN === "undefined" ||
  process.env.CORS_ALLOWED_ORIGIN === "" ||
  process.env.CORS_ALLOWED_ORIGIN === null) {
  throw new Error(
    "Environment variable CORS_ALLOWED_ORIGIN is required but was not found."
  );
}

const secret: Secret = process.env.JWT_SECRET as Secret;

let port;
if (typeof process.env.PORT === "undefined") {
  port = 8080;
} else if (isNaN(parseInt(process.env.PORT))) {
  port = 8080;
} else {
  port = parseInt(process.env.PORT);
}

let corsAllowedOrigins = process.env.CORS_ALLOWED_ORIGIN.split(',');

interface Config {
  DATABASE_URL: string;
  JWT_SECRET: Secret;
  PORT: number;
  CORS_ALLOWED_ORIGINS: string[];
}

export const config: Config = {
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: secret,
  PORT: port,
  CORS_ALLOWED_ORIGINS: corsAllowedOrigins,
};
