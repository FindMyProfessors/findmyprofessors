import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error(
    "Environment variable JWT_SECRET is required but was not found."
  );
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "Environment variable DATABASE_URL is required but was not found."
  );
}

const secret: Secret = process.env.JWT_SECRET as Secret;

const port = process.env.PORT ? Number(process.env.PORT) : 8080;
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
