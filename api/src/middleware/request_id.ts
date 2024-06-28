import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";

function requestIdMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    req.request_id = uuidv4(); // Assigning a UUID to request_id
    next();
  };
}

export default requestIdMiddleware;
