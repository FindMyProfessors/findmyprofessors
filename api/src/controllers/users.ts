import {
  Body,
  Controller,
  Get,
  Path,
  Put,
  Route,
  SuccessResponse,
  Example,
  Security,
  Tags,
  Request,
} from "tsoa";
import {
  UserResponse,
  UpdateUserParams,
  UserErrorType,
  UserNotFoundError,
} from "../models/users";
import { prisma } from "../database/database";
import { User, UserRole } from "@prisma/client";
import { AuthErrorType, JWTBody, UnauthorizedError } from "../models/auth";

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
    role: "NORMAL",
  })
  @Security("jwt")
  @Get("{id}")
  public async getUser(@Path() id: number): Promise<UserResponse> {
    const user = await getUserById(id);

    const userResponse: UserResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      signup_time: user.signup_time,
      last_login_time: user.last_login_time,
      account_verified: user.account_verified,
      role: user.role,
    };

    return userResponse;
  }

  @Example<UpdateUserParams>({
    username: "newusername",
  })
  @Security("jwt")
  @SuccessResponse("204", "User Updated Successfully")
  @Put("{id}")
  public async updateUser(
    @Request() request: any,
    @Path() id: number,
    @Body() body: UpdateUserParams
  ): Promise<void> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_role !== UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You must be an admin to create a school!",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    if (jwt_body.user_id != id && jwt_body.user_role != UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You can only update your own user",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    await getUserById(id);

    const updateData = Object.fromEntries(
      Object.entries(body).filter(([_, v]) => v !== undefined)
    );

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    if (!user) {
      throw new Error("User not found");
    }

    this.setStatus(204);
  }

  @Security("jwt")
  @Get("{id}/cart")
  public async getUserCart(@Path() id: number): Promise<UserResponse | null> {
    // Start transaction
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id }, include: { Cart: true } });
    
      if (!user) {
        throw new Error("User not found");
      }

      const cart = user.Cart;
 
      if (!cart) {
        throw new Error("User cart not found");
      }


    });


    return null;

    //return userResponse;
  }
}

async function getUserById(id: number): Promise<User> {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    const error: UserNotFoundError = {
      message: "User not found",
      type: UserErrorType.USER_NOT_FOUND,
    };
    return Promise.reject(error);
  }
  return user;
}
