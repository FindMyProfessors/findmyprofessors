import dotenv from "dotenv";

describe("Config", () => {
  beforeAll(() => {
    dotenv.config = jest.fn();
  });

  it("should throw an error if JWT_SECRET is not defined", () => {
    process.env.JWT_SECRET = undefined;
    process.env.DATABASE_URL = "some_database_url";
    jest.resetModules(); // Add this line to clear the require cache
    expect(() => require("./config")).toThrow(
      "Environment variable JWT_SECRET is required but was not found."
    );
  });

  it("should throw an error if DATABASE_URL is not defined", () => {
    process.env.JWT_SECRET = "some_secret";
    process.env.DATABASE_URL = undefined;
    jest.resetModules(); // Add this line to clear the require cache

    expect(() => require("./config")).toThrow(
      "Environment variable DATABASE_URL is required but was not found."
    );
  });

  it("should set the correct config values", () => {
    process.env.JWT_SECRET = "some_secret";
    process.env.DATABASE_URL = "some_database_url";
    process.env.PORT = "3000";

    jest.resetModules(); // Clear the require cache
    const { config } = require("./config");

    expect(config).toEqual({
      DATABASE_URL: "some_database_url",
      JWT_SECRET: "some_secret",
      PORT: 3000,
    });
  });

  it("should set the default port if PORT is not defined", () => {
    process.env.JWT_SECRET = "some_secret";
    process.env.DATABASE_URL = "some_database_url";
    process.env.PORT = undefined;

    jest.resetModules(); // Clear the require cache
    const { config } = require("./config");

    expect(config.PORT).toBe(8080);
  });
});
