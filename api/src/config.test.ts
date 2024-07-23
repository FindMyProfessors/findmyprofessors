import dotenv from "dotenv";

describe("Config", () => {
  beforeAll(() => {
    dotenv.config = jest.fn();
  });

  afterEach(() => {
    jest.resetModules(); // Clear the require cache
    delete process.env.JWT_SECRET;
    delete process.env.DATABASE_URL;
    delete process.env.CORS_ALLOWED_ORIGIN;
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_PORT;
    delete process.env.SMTP_SECURE;
    delete process.env.SMTP_AUTH_USER;
    delete process.env.SMTP_AUTH_PASSWORD;
    delete process.env.SMTP_FROM_EMAIL;
    delete process.env.SMTP_FROM_NAME;
    delete process.env.PASSWORD_RESET_URL;
    delete process.env.EMAIL_CONFIRMATION_URL;
  });

  it("should correctly parse environment variables", () => {
    process.env.JWT_SECRET = "some_secret";
    process.env.DATABASE_URL = "some_database_url";
    process.env.CORS_ALLOWED_ORIGIN = "http://example.com";
    process.env.SMTP_HOST = "smtp.example.com";
    process.env.SMTP_PORT = "587";
    process.env.SMTP_SECURE = "true";
    process.env.SMTP_AUTH_USER = "user@example.com";
    process.env.SMTP_AUTH_PASSWORD = "password";
    process.env.SMTP_FROM_EMAIL = "noreply@example.com";
    process.env.SMTP_FROM_NAME = "Example";
    process.env.PASSWORD_RESET_URL = "http://example.com/reset";
    process.env.EMAIL_CONFIRMATION_URL = "http://example.com/confirm";

    const { config } = require("./config");

    expect(config.JWT_SECRET).toBe("some_secret");
    expect(config.DATABASE_URL).toBe("some_database_url");
    expect(config.CORS_ALLOWED_ORIGINS).toEqual(["http://example.com"]);
    expect(config.SMTP_HOST).toBe("smtp.example.com");
    expect(config.SMTP_PORT).toBe(587);
    expect(config.SMTP_SECURE).toBe(true);
    expect(config.SMTP_AUTH_USER).toBe("user@example.com");
    expect(config.SMTP_AUTH_PASSWORD).toBe("password");
    expect(config.SMTP_FROM_EMAIL).toBe("noreply@example.com");
    expect(config.SMTP_FROM_NAME).toBe("Example");
    expect(config.PASSWORD_RESET_URL).toBe("http://example.com/reset");
    expect(config.EMAIL_CONFIRMATION_URL).toBe("http://example.com/confirm");
  });
});