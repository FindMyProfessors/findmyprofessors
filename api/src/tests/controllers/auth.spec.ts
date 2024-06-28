import { AuthController } from "../../controllers/auth";
import { AuthErrorType } from "../../models/auth";
import { describe, expect, test } from "@jest/globals";

describe("AuthController", () => {
  let authController: AuthController;

  beforeEach(() => {
    authController = new AuthController();
  });

  test("should return an error if the password is too short", async () => {
    const body = {
      username: "testuser",
      email: "test@example.com",
      password: "short",
    };

    await expect(authController.register(body)).rejects.toHaveProperty(
      "type",
      AuthErrorType.PASSWORD_TOO_SHORT
    );
  });

  test("should return an error if the password is too long", async () => {
    const body = {
      username: "testuser",
      email: "test@example.com",
      password: "a".repeat(51),
    };

    await expect(authController.register(body)).rejects.toHaveProperty(
      "type",
      AuthErrorType.PASSWORD_TOO_LONG
    );
  });

  test("should return an error if the password is missing an uppercase letter", async () => {
    const body = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };

    await expect(authController.register(body)).rejects.toHaveProperty(
      "type",
      AuthErrorType.PASSWORD_MISSING_UPPERCASE
    );
  });

  test("should return an error if the password is missing a number", async () => {
    const body = {
      username: "testuser",
      email: "test@example.com",
      password: "Password",
    };

    await expect(authController.register(body)).rejects.toHaveProperty(
      "type",
      AuthErrorType.PASSWORD_MISSING_NUMBER
    );
  });
});
