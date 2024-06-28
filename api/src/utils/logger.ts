import winston from "winston";

// Configure winston logger
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.json()),
  transports: [
    new winston.transports.Console(),
    //new winston.transports.File({ filename: "logfile.log" }),
  ],
});

