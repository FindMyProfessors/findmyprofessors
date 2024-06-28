import { User } from "@prisma/client";
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Route,
  SuccessResponse,
  Example,
  Security,
  Tags,
  Request,
} from "tsoa";
import { UserResponse, UpdateUserParams } from "../models/users";
import { prisma } from "../database/database";

@Route("users")
@Tags("Users")
export class UsersController extends Controller {
  @Example<UserResponse>({
    id: 1,
    username: "joedoe",
    email: "johndoe@gmail.com",
    signup_time: new Date("2021-03-25"),
    last_login_time: new Date("2021-03-26"),
    account_verified: true,
  })
  @Security("jwt")
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

  @Example<UpdateUserParams>({
    username: "newusername",
  })
  @Security("jwt")
  @SuccessResponse("204", "User Updated Successfully")
  @Put("{user_id}")
  public async updateUser(
    @Request() request: any,
    @Path() user_id: number,
    @Body() body: UpdateUserParams
  ): Promise<void> {
    if (request.user_id != user_id) {
      throw new Error("You can only update your own user");
    }

    const updateData = Object.fromEntries(
      Object.entries(body).filter(([_, v]) => v !== undefined)
    );

    const user = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: updateData,
    });

    if (!user) {
      throw new Error("User not found");
    }

    this.setStatus(204);
  }
}
