/*
import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .send({ error: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];
  const secret: Secret = process.env.JWT_SECRET as Secret;

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Failed to authenticate token" });
    }
    req.user = decoded;
    next();
  });
};

export default jwtMiddleware;
*/

import * as express from "express";
import * as jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "jwt") {
    return new Promise((resolve, reject) => {
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        reject(new Error("No token provided"));
        return;
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        reject(new Error("No token provided"));
        return;
      }

      const secret: Secret = process.env.JWT_SECRET as Secret;

      jwt.verify(token, secret, function (err: any, decoded: any) {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  } else {
    return Promise.reject(new Error("Invalid security name"));
  }
}
