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

@Route("users")
export class UsersController extends Controller {
  @Example<UserResponse>({
    id: 1,
    username: "joedoe",
    email: "johndoe@gmail.com",
    signup_time: new Date("2021-03-25"),
    last_login_time: new Date("2021-03-26"),
    account_verified: true,
  })
  @Get("{user_id}")
  public async getUser(@Path() user_id: number): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

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
}
