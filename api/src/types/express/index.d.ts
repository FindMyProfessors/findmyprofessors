// src/types/express/index.d.ts

import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      request_id?: string; // Adding request_id to the Express Request type
    }
  }
}
