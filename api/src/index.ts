import express, {
  json,
  urlencoded,
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { RegisterRoutes } from "../build/routes";
// Add winston configuration and express middleware for it
import expressWinston from "express-winston";

import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";

import { AuthErrorHttpStatus, isAuthError } from "./models/auth";
import { logger } from "./utils/logger";
import requestIdMiddleware from "./middleware/request_id";
import { config } from "./config";

import cors from 'cors';

export const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());
app.use(requestIdMiddleware());

// Add support for cors
app.use(cors({
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: config.CORS_ALLOWED_ORIGINS
}));

// Add expressWinston middleware to log HTTP requests
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message.
    expressFormat: true,
    colorize: false,
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    dynamicMeta: function (req: any, res: any) {
      return {
        request_id: req.request_id,
      };
    },
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
    const statusCode = AuthErrorHttpStatus[err.type];
    return res.status(statusCode).json({
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


app.listen(config.PORT, () =>
  console.log(`App listening at http://localhost:${config.PORT}`)
);
