const usernameRegex = /^[a-z0-9_]{5,16}$/;

import {
  Body,
  Controller,
  Post,
  Route,
  SuccessResponse,
  Example,
  Response,
  Tags,
} from "tsoa";
import { UserResponse } from "../models/users";
import { prisma } from "../database/database";
import {
  LoginParams,
  LoginResponse,
  RegistrationParams,
  UserAlreadyExistsError,
  UserNotFoundError,
  InvalidPasswordError,
  InvalidUsernameError,
  AuthErrorType,
  PasswordMissingNumberError,
  PasswordMissingUppercaseError,
  PasswordTooLongError,
  PasswordTooShortError,
  AuthError,
  InvalidTokenError,
  JWTBody,
} from "../models/auth";

import { logger } from "../utils/logger";

import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { config } from "../config";
import { User } from "@prisma/client";

function validateUsername(username: string): InvalidUsernameError | null {
  if (!usernameRegex.test(username)) {
    return {
      message:
        "Username must be between 5 and 16 characters, all lowercase, no special characters other than underscores, and no spaces.",
      type: AuthErrorType.INVALID_USERNAME,
    } as InvalidUsernameError;
  }
  return null;
}

function validatePassword(password: string): AuthError | null {
  if (password.length < 8) {
    return {
      message: "Password must be at least 8 characters long.",
      type: AuthErrorType.PASSWORD_TOO_SHORT,
    } as PasswordTooShortError;
  }

  if (password.length > 50) {
    return {
      message: "Password must not exceed 50 characters.",
      type: AuthErrorType.PASSWORD_TOO_LONG,
    } as PasswordTooLongError;
  }

  if (!/[A-Z]/.test(password)) {
    return {
      message: "Password must contain at least one uppercase letter.",
      type: AuthErrorType.PASSWORD_MISSING_UPPERCASE,
    } as PasswordMissingUppercaseError;
  }

  if (!/\d/.test(password)) {
    return {
      message: "Password must contain at least one number.",
      type: AuthErrorType.PASSWORD_MISSING_NUMBER,
    } as PasswordMissingNumberError;
  }

  return null;
}

@Route("auth")
@Tags("Authentication")
export class AuthController extends Controller {
  @SuccessResponse("201", "User Created Successfully")
  @Response<UserAlreadyExistsError>("409", "User already exists")
  @Example<RegistrationParams>({
    email: "johndoe@gmail.com",
    username: "joedoe",
    password: "Password123!",
  })
  @Post("register")
  public async register(
    @Body() body: RegistrationParams
  ): Promise<LoginResponse> {
    const usernameError = validateUsername(body.username);
    if (usernameError) {
      return Promise.reject(usernameError);
    }

    const passwordError = validatePassword(body.password);
    if (passwordError) {
      return Promise.reject(passwordError);
    }

    const user_lookup = await prisma.user.findFirst({
      where: {
        OR: [{ username: body.username }, { email: body.email }],
      },
    });

    if (user_lookup) {
      const error: UserAlreadyExistsError = {
        message: "User already exists",
        type: AuthErrorType.USER_ALREADY_EXISTS,
      };
      return Promise.reject(error);
    }

    const hashedPassword = await hashPassword(body);

    let user;
    try {
      user = await prisma.user.create({
        data: {
          email: body.email,
          username: body.username,
          password: hashedPassword,
        },
      });
    } catch (error: any) {
      logger.error("Failed to create user", error);
      throw new Error("Failed to create user: " + error.message);
    }

    const userResponse: UserResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      signup_time: user.signup_time,
      last_login_time: user.last_login_time,
      account_verified: user.account_verified,
      role: user.role,
    };
    let token = await createJwt(user);

    const loginResponse: LoginResponse = { token, user: userResponse };

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        last_login_time: new Date(),
      },
    });

    return loginResponse;
  }

  @SuccessResponse("200", "Login Successful")
  @Response<UserNotFoundError>("404", "User does not exist")
  @Response<InvalidPasswordError>("401", "Invalid password")
  @Example<LoginParams>({
    username: "joedoe",
    password: "Password123!",
  })
  @Post("login")
  public async login(@Body() body: LoginParams): Promise<LoginResponse> {
    const usernameError = validateUsername(body.username);
    if (usernameError) {
      return Promise.reject(usernameError);
    }

    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
      },
    });

    if (!user) {
      const error: UserNotFoundError = {
        message: "User does not exist",
        type: AuthErrorType.USER_NOT_FOUND,
      };
      return Promise.reject(error);
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (!passwordMatch) {
      const error: InvalidPasswordError = {
        message: "Invalid password",
        type: AuthErrorType.INVALID_PASSWORD,
      };
      return Promise.reject(error);
    }

    const userResponse: UserResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      signup_time: user.signup_time,
      last_login_time: user.last_login_time,
      account_verified: user.account_verified,
      role: user.role,
    };

    let token = await createJwt(user);

    const loginResponse: LoginResponse = { token, user: userResponse };

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        last_login_time: new Date(),
      },
    });

    return loginResponse;
  }
}

export async function hashPassword(body: RegistrationParams) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(body.password, salt);
  return hashedPassword;
}

async function createJwt(user: User): Promise<string> {
  let token: string;
  let body = { user_id: user.id, user_role: user.role } as JWTBody;

  try {
    token = jwt.sign(body, config.JWT_SECRET);
  } catch (originalError) {
    const error: InvalidTokenError = {
      message: `Error creating JWT: ${originalError}`,
      type: AuthErrorType.INVALID_TOKEN,
    };
    return Promise.reject(error);
  }
  return token;
}
