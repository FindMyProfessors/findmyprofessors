import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";
dotenv.config();

if (
  typeof process.env.JWT_SECRET === "undefined" ||
  process.env.JWT_SECRET === "" ||
  process.env.JWT_SECRET === null ||
  process.env.JWT_SECRET === "undefined"
) {
  throw new Error(
    "Environment variable JWT_SECRET is required but was not found."
  );
}

if (
  typeof process.env.DATABASE_URL === "undefined" ||
  process.env.DATABASE_URL === "" ||
  process.env.DATABASE_URL === null ||
  process.env.DATABASE_URL === "undefined"
) {
  throw new Error(
    "Environment variable DATABASE_URL is required but was not found."
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

interface Config {
  DATABASE_URL: string;
  JWT_SECRET: Secret;
  PORT: number;
}

export const config: Config = {
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: secret,
  PORT: port,
};
