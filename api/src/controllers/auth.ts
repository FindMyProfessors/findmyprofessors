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
} from "../models/auth";

import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

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
  ): Promise<UserResponse> {
    if (!usernameRegex.test(body.username)) {
      this.setStatus(400);
      const error: InvalidUsernameError = {
        message:
          "Username must be between 5 and 16 characters, all lowercase, no special characters other than underscores, and no spaces.",
        type: AuthErrorType.INVALID_USERNAME,
      };
      return Promise.reject(error);
    }

    const password = body.password;
    if (password.length < 8) {
      this.setStatus(400);
      const error: PasswordTooShortError = {
        message: "Password must be at least 8 characters long.",
        type: AuthErrorType.PASSWORD_TOO_SHORT,
      };
      return Promise.reject(error);
    }

    if (password.length > 50) {
      this.setStatus(400);
      const error: PasswordTooLongError = {
        message: "Password must not exceed 50 characters.",
        type: AuthErrorType.PASSWORD_TOO_LONG,
      };
      return Promise.reject(error);
    }

    if (!/[A-Z]/.test(password)) {
      this.setStatus(400);
      const error: PasswordMissingUppercaseError = {
        message: "Password must contain at least one uppercase letter.",
        type: AuthErrorType.PASSWORD_MISSING_UPPERCASE,
      };
      return Promise.reject(error);
    }

    if (!/\d/.test(password)) {
      this.setStatus(400);
      const error: PasswordMissingNumberError = {
        message: "Password must contain at least one number.",
        type: AuthErrorType.PASSWORD_MISSING_NUMBER,
      };
      return Promise.reject(error);
    }

    const user_lookup = await prisma.user.findFirst({
      where: {
        OR: [{ username: body.username }, { email: body.email }],
      },
    });

    if (user_lookup) {
      this.setStatus(409);
      const error: UserAlreadyExistsError = {
        message: "User already exists",
        type: AuthErrorType.USER_ALREADY_EXISTS,
      };
      return Promise.reject(error);
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        password: hashedPassword,
      },
    });

    const userResponse: UserResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      signup_time: user.signup_time,
      last_login_time: user.last_login_time,
      account_verified: user.account_verified,
    };

    return userResponse;
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
    if (!usernameRegex.test(body.username)) {
      this.setStatus(400);
      const error: InvalidUsernameError = {
        message:
          "Username must be between 5 and 16 characters, all lowercase, no special characters other than underscores, and no spaces.",
        type: AuthErrorType.INVALID_USERNAME,
      };
      return Promise.reject(error);
    }

    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
      },
    });

    if (!user) {
      this.setStatus(404);
      const error: UserNotFoundError = {
        message: "User does not exist",
        type: AuthErrorType.USER_NOT_FOUND,
      };
      return Promise.reject(error);
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (!passwordMatch) {
      this.setStatus(401);
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
    };

    const jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) {
      throw new Error("JWT secret not found");
    }

    let token: string;
    try {
      token = jwt.sign({ user_id: user.id }, jwt_secret);
    } catch (error) {
      throw new Error("Error creating JWT");
    }

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
