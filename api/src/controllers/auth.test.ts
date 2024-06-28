import { AuthController } from "./auth";
import { AuthErrorType } from "../models/auth";
import { describe, expect, test } from "@jest/globals";
import { prisma } from "../database/database"; // Import prisma
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

jest.mock("../database/database", () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(), // Mock the update method
    },
  },
}));

jest.mock("../utils/logger", () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe("AuthController", () => {
  let authController: AuthController;
  /*
  let postgresContainer: StartedPostgreSqlContainer;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start();
  }, 30000);

  afterAll(async () => {
    await postgresContainer.stop();
  }, 30000);
*/
  beforeEach(() => {
    authController = new AuthController();
  });

  test("should return an error if the username is invalid on login", async () => {
    const body = {
      username: "invalid username",
      password: "Password123!",
    };

    await expect(authController.login(body)).rejects.toHaveProperty(
      "type",
      AuthErrorType.INVALID_USERNAME
    );
  });

  test("should create a new user successfully", async () => {
    const body = {
      username: "newuser",
      email: "newuser@example.com",
      password: "Password123!",
    };

    const hashedPassword = await bcrypt.hash(body.password, 10);

    jest.spyOn(prisma.user, "findFirst").mockResolvedValueOnce(null);
    jest.spyOn(prisma.user, "create").mockResolvedValueOnce({
      id: 1,
      username: body.username,
      email: body.email,
      password: hashedPassword,
      signup_time: new Date(),
      last_login_time: new Date(),
      account_verified: true,
    });

    const userResponse: UserResponse = await authController.register(body);

    expect(userResponse).toHaveProperty("id");
    expect(userResponse).toHaveProperty("username", body.username);
    expect(userResponse).toHaveProperty("email", body.email);
    expect(userResponse).toHaveProperty("signup_time");
    expect(userResponse).toHaveProperty("last_login_time");
    expect(userResponse).toHaveProperty("account_verified", true);
  });

  test("should log an error and throw an error if user creation fails", async () => {
    const body = {
      username: "newuser",
      email: "newuser@example.com",
      password: "Password123!",
    };

    jest.spyOn(prisma.user, "findFirst").mockResolvedValueOnce(null);
    jest.spyOn(prisma.user, "create").mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    await expect(authController.register(body)).rejects.toThrow(
      "Failed to create user: Database error"
    );

    expect(logger.error).toHaveBeenCalledWith(
      "Failed to create user",
      expect.any(Error)
    );
  });

  test("should return an error if the user already exists", async () => {
    const body = {
      username: "existinguser",
      email: "existing@example.com",
      password: "Password123!",
    };

    jest.spyOn(prisma.user, "findFirst").mockResolvedValueOnce({
      id: 1,
      username: body.username,
      email: body.email,
      password: "hashedpassword",
      signup_time: new Date(),
      last_login_time: new Date(),
      account_verified: true,
    });

    await expect(authController.register(body)).rejects.toHaveProperty(
      "type",
      AuthErrorType.USER_ALREADY_EXISTS
    );
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

  test("should return an error if the username is invalid", async () => {
    const body = {
      username: "invalid username",
      email: "test@example.com",
      password: "Password123!",
    };

    await expect(authController.register(body)).rejects.toHaveProperty(
      "type",
      AuthErrorType.INVALID_USERNAME
    );
  });

  test("should return an error if the user already exists", async () => {
    const body = {
      username: "existinguser",
      email: "existing@example.com",
      password: "Password123!",
    };

    // Mock the prisma.user.findFirst to return a user
    jest.spyOn(prisma.user, "findFirst").mockResolvedValueOnce({
      id: 1,
      username: "existinguser",
      email: "existing@example.com",
      password: "hashedpassword",
      signup_time: new Date(),
      last_login_time: new Date(),
      account_verified: true,
    });

    await expect(authController.register(body)).rejects.toHaveProperty(
      "type",
      AuthErrorType.USER_ALREADY_EXISTS
    );
  });

  test("should return a token and user on successful login", async () => {
    const body = {
      username: "testuser",
      password: "Password123!",
    };

    // Mock the prisma.user.findFirst to return a user
    jest.spyOn(prisma.user, "findFirst").mockResolvedValueOnce({
      id: 1,
      username: "testuser",
      email: "test@example.com",
      password: await bcrypt.hash("Password123!", 10),
      signup_time: new Date(),
      last_login_time: new Date(),
      account_verified: true,
    });

    const response = await authController.login(body);

    expect(response).toHaveProperty("token");
    expect(response).toHaveProperty("user");
    expect(response.user).toHaveProperty("username", "testuser");
  });

  test("should return an error if the user does not exist on login", async () => {
    const body = {
      username: "nonexistentuser",
      password: "Password123!",
    };

    // Mock the prisma.user.findFirst to return null
    jest.spyOn(prisma.user, "findFirst").mockResolvedValueOnce(null);

    await expect(authController.login(body)).rejects.toHaveProperty(
      "type",
      AuthErrorType.USER_NOT_FOUND
    );
  });

  test("should return an error if the password is incorrect on login", async () => {
    const body = {
      username: "testuser",
      password: "WrongPassword123!",
    };

    // Mock the prisma.user.findFirst to return a user
    jest.spyOn(prisma.user, "findFirst").mockResolvedValueOnce({
      id: 1,
      username: "testuser",
      email: "test@example.com",
      password: await bcrypt.hash("Password123!", 10),
      signup_time: new Date(),
      last_login_time: new Date(),
      account_verified: true,
    });

    await expect(authController.login(body)).rejects.toHaveProperty(
      "type",
      AuthErrorType.INVALID_PASSWORD
    );
  });
  test("should return an error if JWT creation fails on login", async () => {
    const body = {
      username: "testuser",
      password: "Password123!",
    };

    // Mock the prisma.user.findFirst to return a user
    jest.spyOn(prisma.user, "findFirst").mockResolvedValueOnce({
      id: 1,
      username: "testuser",
      email: "test@example.com",
      password: await bcrypt.hash("Password123!", 10),
      signup_time: new Date(),
      last_login_time: new Date(),
      account_verified: true,
    });

    (jwt.sign as jest.Mock).mockImplementationOnce(() => {
      throw new Error("JWT creation error");
    });

    await expect(authController.login(body)).rejects.toHaveProperty(
      "message",
      "Error creating JWT: Error: JWT creation error"
    );
  });
});

import { hashPassword } from "./auth"; // Import hashPassword
import { logger } from "../utils/logger";
import { UserResponse } from "../models/users";

describe("hashPassword", () => {
  test("should hash the password correctly", async () => {
    const body = {
      username: "testuser",
      email: "test@example.com",
      password: "Password123!",
    };

    const hashedPassword = await hashPassword(body);

    // Check that the hashed password is not the same as the plain password
    expect(hashedPassword).not.toBe(body.password);

    // Check that the hashed password can be verified with bcrypt
    const isMatch = await bcrypt.compare(body.password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  test("should throw an error if bcrypt fails", async () => {
    const body = {
      username: "testuser",
      email: "test@example.com",
      password: "Password123!",
    };

    // Mock bcrypt.hash to throw an error
    jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => {
      throw new Error("bcrypt error");
    });

    await expect(hashPassword(body)).rejects.toThrow("bcrypt error");
  });
});
