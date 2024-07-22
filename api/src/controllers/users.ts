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
  Post,
  Delete,
} from "tsoa";
import {
  UserResponse,
  UpdateUserParams,
  UserErrorType,
  UserNotFoundError,
  EmailAlreadyConfirmedError,
  ResetPasswordParams,
  EmailNotConfirmedError,
  ConfirmEmailParams,
  PasswordResetExpiredError,
  UserCartResponse,
  UserCartEntry,
  AddToCartParams,
  UserCartEntryAlreadyExistsError,
} from "../models/users";
import { prisma } from "../database/database";
import { User, UserCart, UserRole } from "@prisma/client";
import { AuthErrorType, JWTBody, UnauthorizedError } from "../models/auth";
import { v4 as uuidv4 } from "uuid";
import { sendEmailConfirmation, sendPasswordReset } from "../mailer";
import { formatEmailConfirmationUrl, formatPasswordResetUrl } from "../config";
import { logger } from "../utils/logger";
import { hashPassword } from "./auth";
import { use } from "chai";

@Route("users")
@Tags("Users")
export class UsersController extends Controller {
  @Security("jwt")
  @Post("{id}/send-email-confirmation")
  public async sendEmailConfirmationEmail(
    @Request() request: any,
    @Path() id: number
  ): Promise<void> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_id != id && jwt_body.user_role != UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You can only send reset password emails for your own user",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    const user = await prisma.user.findUnique({
      where: { id: id },
      select: { email: true, username: true },
    });

    if (!user) {
      const error: UserNotFoundError = {
        message: "User not found",
        type: UserErrorType.USER_NOT_FOUND,
      };
      return Promise.reject(error);
    }
    // check if email was confirmed
    let emailConfirmation = await prisma.emailConfirmation.findUnique({
      where: { user_id: id, confirmed_at: { not: null } },
    });

    if (emailConfirmation) {
      const error: EmailAlreadyConfirmedError = {
        message: "User email already confirmed",
        type: UserErrorType.EMAIL_ALREADY_CONFIRMED,
      };
      return Promise.reject(error);
    }

    // Check if there is a pending email confirmation that has not expired
    emailConfirmation = await prisma.emailConfirmation.findFirst({
      where: {
        user_id: id,
        confirmed_at: null,
        expires_at: {
          gt: new Date(), // Checks if the expiration date is greater than the current date
        },
      },
    });

    let token = emailConfirmation?.token ?? uuidv4();

    if (!emailConfirmation) {
      // Create an email confrmation
      emailConfirmation = await prisma.emailConfirmation.create({
        data: {
          user_id: id,
          token: token,
          expires_at: new Date(Date.now() + 3600000), // 1 hour from now
        },
      });
    }

    const resetUrl = formatEmailConfirmationUrl(token);

    try {
      await sendEmailConfirmation(user.email, user.username, resetUrl);
    } catch (error) {
      logger.error(error);
      throw new Error("Internal Server Error");
    }

    this.setStatus(200);
  }

  // Add password reset endpoint
  @Security("jwt")
  @Post("{id}/confirm-email")
  public async confirmEmail(
    @Request() request: any,
    @Path() id: number,
    @Body() body: ConfirmEmailParams
  ): Promise<void> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_id != id && jwt_body.user_role != UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You can only confirm your own email",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    // make sure user exists
    const user = await getUserById(id);

    if (user.account_verified) {
      const error: EmailAlreadyConfirmedError = {
        message: "User email already confirmed",
        type: UserErrorType.EMAIL_ALREADY_CONFIRMED,
      };
      return Promise.reject(error);
    }

    // check token
    const emailConfirmation = await prisma.emailConfirmation.findUnique({
      where: { user_id: id, token: body.token, confirmed_at: null },
    });

    if (!emailConfirmation) {
      const error: EmailNotConfirmedError = {
        message: "Email confirmation token is invalid",
        type: UserErrorType.EMAIL_NOT_CONFIRMED,
      };
      return Promise.reject(error);
    }

    // update email confirmation
    await prisma.emailConfirmation.update({
      where: { id: emailConfirmation.id },
      data: { confirmed_at: new Date() },
    });

    // set account to verified
    await prisma.user.update({
      where: { id: id },
      data: { account_verified: true },
    });

    this.setStatus(200);
  }

  // add send password reset email endpoint
  @Security("jwt")
  @Post("{id}/send-password-reset")
  public async sendPasswordResetEmail(
    @Request() request: any,
    @Path() id: number
  ): Promise<void> {
    logger.debug("Attempting to send password reset email for user ID: " + id);
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_id != id && jwt_body.user_role != UserRole.ADMIN) {
      logger.warn("Unauthorized attempt to reset password for user ID: " + id);
      const error: UnauthorizedError = {
        message: "You can only reset the password for your own user",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    const user = await prisma.user.findUnique({
      where: { id: id },
      select: { email: true, username: true },
    });

    if (!user) {
      logger.error("User not found for ID: " + id);
      const error: UserNotFoundError = {
        message: "User not found",
        type: UserErrorType.USER_NOT_FOUND,
      };
      return Promise.reject(error);
    }

    logger.debug(
      "Checking for existing valid password resets for user ID: " + id
    );
    let passwordReset = await prisma.passwordReset.findFirst({
      where: {
        user_id: id,
        used_at: null,
        expires_at: {
          gt: new Date(), // Checks if the expiration date is greater than the current date
        },
      },
    });

    let token = passwordReset?.token ?? uuidv4();

    if (!passwordReset) {
      logger.debug(
        "No valid password reset found, creating new one for user ID: " + id
      );
      passwordReset = await prisma.passwordReset.create({
        data: {
          user_id: id,
          token: token,
          expires_at: new Date(Date.now() + 3600000), // 1 hour from now
        },
      });
    }

    const resetUrl = formatPasswordResetUrl(token);
    logger.debug("Password reset URL generated for user ID: " + id);

    try {
      await sendPasswordReset(user.email, user.username, resetUrl);
      logger.info("Password reset email sent successfully to user ID: " + id);
    } catch (error) {
      logger.error(
        "Failed to send password reset email for user ID: " +
          id +
          "; Error: " +
          error
      );
      throw new Error("Internal Server Error");
    }

    this.setStatus(200);
  }

  // Add password reset endpoint
  @Security("jwt")
  @Post("{id}/reset-password")
  public async resetPassword(
    @Request() request: any,

    @Path() id: number,
    @Body() body: ResetPasswordParams
  ): Promise<void> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_id != id && jwt_body.user_role != UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You can only reset the password for your own user",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }
    // make sure user exists
    await getUserById(id);

    let passwordReset = await prisma.passwordReset.findUnique({
      where: {
        token: body.token,
        user_id: id,
        used_at: null,
        expires_at: {
          gt: new Date(), // Checks if the expiration date is greater than the current date
        },
      },
    });

    if (!passwordReset) {
      const error: PasswordResetExpiredError = {
        message: "Password reset token is invalid or expired",
        type: UserErrorType.PASSWORD_RESET_EXPIRED,
      };
      return Promise.reject(error);
    }

    const hashedPassword = await hashPassword(body.password);

    // update password for user
    await prisma.user.update({
      where: { id: id },
      data: { password: hashedPassword },
    });

    // set password reset to used
    await prisma.passwordReset.update({
      where: { id: passwordReset.id },
      data: { used_at: new Date() },
    });

    // Make all other password resets for this user invalid
    await prisma.passwordReset.updateMany({
      where: { user_id: id, used_at: null },
      data: { expires_at: new Date() },
    });

    this.setStatus(200);
  }

  @Security("jwt")
  @Get("{id}/cart")
  public async getUserCart(@Path() id: number): Promise<UserCartResponse> {
    const userCart = await prisma.userCart.findMany({
      where: { user_id: id },
      include: { course: true, professor: true },
    });

    if (!userCart) {
      const error: UserNotFoundError = {
        message: "User cart not found",
        type: UserErrorType.USER_NOT_FOUND,
      };
      return Promise.reject(error);
    }

    let response = {
      entries: userCart.map(
        (entry) =>
          ({
            course: entry.course,
            professor: entry.professor,
          } as UserCartEntry)
      ),
    } as UserCartResponse;

    return response;
  }

  @Security("jwt")
  @Post("{id}/cart")
  public async addToCart(
    @Request() request: any,
    @Path() id: number,
    @Body() body: AddToCartParams
  ): Promise<void> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_id != id && jwt_body.user_role != UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You can only add to your own cart",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    const userCart = await prisma.userCart.findFirst({
      where: {
        user_id: id,
        course_id: body.course_id,
        professor_id: body.professor_id,
      },
    });
    if (userCart) {
      const error: UserCartEntryAlreadyExistsError = {
        message: "User cart entry already exists",
        type: UserErrorType.USER_CART_ENTRY_ALREADY_EXISTS,
      };
      return Promise.reject(error);
    }

    await prisma.userCart.create({
      data: {
        user_id: id,
        course_id: body.course_id,
        professor_id: body.professor_id,
      },
    });

    this.setStatus(201);
  }

  @Security("jwt")
  @Delete("{id}/cart")
  public async deleteFromCart(
    @Request() request: any,
    @Path() id: number,
    @Body() body: { course_id: number; professor_id: number }
  ): Promise<void> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_id != id && jwt_body.user_role != UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You can only delete from your own cart",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    await prisma.userCart.deleteMany({
      where: {
        user_id: id,
        AND: [
          { course_id: body.course_id },
          { professor_id: body.professor_id },
        ],
      },
    });

    this.setStatus(204);
  }

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
