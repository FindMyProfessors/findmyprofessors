
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