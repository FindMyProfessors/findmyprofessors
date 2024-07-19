import * as express from "express";
import * as jwt from "jsonwebtoken";
import { logger } from "../utils/logger";
import { InvalidTokenError, AuthErrorType } from "../models/auth";
import { config } from "../config";

const invalidTokenError: InvalidTokenError = {
  message: "The token provided is invalid.",
  type: AuthErrorType.INVALID_TOKEN,
};

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  const childLogger = logger.child({ requestId: request });
  if (securityName === "jwt") {
    return new Promise((resolve, reject) => {
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        childLogger.warn("No token provided");
        reject(invalidTokenError);
        return;
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        childLogger.warn("No token provided");
        reject(invalidTokenError);
        return;
      }

      jwt.verify(token, config.JWT_SECRET, function (err: any, decoded: any) {
        if (err) {
          childLogger.warn("Rejected token", { error: err, decoded: decoded });
          reject(invalidTokenError);
        } else {
          resolve(decoded);
        }
      });
    });
  } else {
    return Promise.reject(new Error("Invalid security name"));
  }
}
