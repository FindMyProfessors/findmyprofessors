import { User } from "@prisma/client";
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Example,
} from "tsoa";
import { UserResponse } from "../models/users";
import { prisma } from "../database/database";
import { LoginParams, LoginResponse, RegistrationParams } from "../models/auth";

import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Route("auth")
export class AuthController extends Controller {
  @SuccessResponse("201", "Created")
  @Example<RegistrationParams>({
    email: "johndoe@gmail.com",
    username: "joedoe",
    password: "password",
  })
  @Post("register")
  public async register(
    @Body() body: RegistrationParams
  ): Promise<UserResponse> {
    // Check if user exists and return JSON response error if they do
    const user_lookup = await prisma.user.findFirst({
      where: {
        OR: [{ username: body.username }, { email: body.email }],
      },
    });

    if (user_lookup) {
      throw new Error("User already exists");
    }

    // Salt password and hash with bcrypt
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

    // Return user response
    return userResponse;
  }

  // Login
  @Post("login")
  public async login(@Body() body: LoginParams): Promise<LoginResponse> {
    // Check if user exists and return JSON response error if they do
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
      },
    });

    if (!user) {
      throw new Error("User does not exist");
    }

    // Verify password with bcrypt
    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid password");
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

    // Create JWT with error handling
    let token: string;
    try {
      token = jwt.sign({ userId: user.id }, jwt_secret);
    } catch (error) {
      throw new Error("Error creating JWT");
    }

    const loginResponse: LoginResponse = { token, user: userResponse };

    // Update last login time
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        last_login_time: new Date(),
      },
    });

    // Return user response
    return loginResponse;
  }
}
