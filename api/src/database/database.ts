import { PrismaClient } from "@prisma/client";
import { config } from "../config";

// Initialize Prisma Client
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.DATABASE_URL,
    },
  },
});

