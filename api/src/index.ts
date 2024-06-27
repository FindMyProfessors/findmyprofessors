import express, {
  json,
  urlencoded,
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { RegisterRoutes } from "../build/routes";
// Add winston configuration and express middleware for it
import winston from "winston";
import expressWinston from "express-winston";

// Configure winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.json()),
  transports: [
    new winston.transports.Console(),
    //new winston.transports.File({ filename: "logfile.log" }),
  ],
});
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";

import { AuthError, isAuthError } from "./models/auth";

export const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

// Add expressWinston middleware to log HTTP requests
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message.
    expressFormat: true,
    colorize: false,
  })
);

RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: "Not Found",
  });
});

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  logger.warn(err);

  if (isAuthError(err)) {
    return res.status(401).json({
      message: err.message,
      type: err.type,
    });
  }
  
  if (err instanceof ValidateError) {
    logger.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
