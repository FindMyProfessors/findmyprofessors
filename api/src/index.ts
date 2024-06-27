import express, { json, urlencoded, Response as ExResponse, Request as ExRequest }  from "express";
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

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
