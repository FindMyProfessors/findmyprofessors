import { User } from "@prisma/client";

export type UserResponse = Omit<User, "password">;
export type GetUserParams = Pick<User, "id">;

export type UpdateUserParams = Omit<
  User,
  | "password"
  | "signup_time"
  | "account_verified"
  | "id"
  | "last_login_time"
  | "email"
  | "role"
>;

// New types for delete user operation
export type DeleteUserParams = Pick<User, "id">;
export type DeleteUserResponse = UserResponse;

// Create types for error handling
export enum UserErrorType {
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_UPDATE_FAILED = "USER_UPDATE_FAILED",
  USER_DELETE_FAILED = "USER_DELETE_FAILED",
  INVALID_USER_ID = "INVALID_USER_ID",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  EMAIL_ALREADY_CONFIRMED = "EMAIL_ALREADY_CONFIRMED", // Added new error type
  EMAIL_NOT_CONFIRMED = "EMAIL_NOT_CONFIRMED",
  PASSWORD_RESET_EXPIRED = "PASSWORD_RESET_EXPIRED",
}

export const UserErrorHttpStatus = {
  [UserErrorType.USER_NOT_FOUND]: 404,
  [UserErrorType.USER_UPDATE_FAILED]: 500,
  [UserErrorType.USER_DELETE_FAILED]: 500,
  [UserErrorType.INVALID_USER_ID]: 400,
  [UserErrorType.UNKNOWN_ERROR]: 500,
  [UserErrorType.EMAIL_ALREADY_CONFIRMED]: 400,
  [UserErrorType.EMAIL_NOT_CONFIRMED]: 400,
  [UserErrorType.PASSWORD_RESET_EXPIRED]: 400,
};

export type UserError = {
  message: string | { [key: string]: string };
  type: UserErrorType;
};

export function isUserError(error: any): error is UserError {
  return (
    typeof error === "object" &&
    error !== null &&
    typeof error.message === "string" &&
    typeof error.type === "string" &&
    Object.values(UserErrorType).includes(error.type as UserErrorType)
  );
}

export type UserNotFoundError = Pick<UserError, "message" | "type"> & {
  type: UserErrorType.USER_NOT_FOUND;
};

export type UserUpdateFailedError = Pick<UserError, "message" | "type"> & {
  type: UserErrorType.USER_UPDATE_FAILED;
};

export type UserDeleteFailedError = Pick<UserError, "message" | "type"> & {
  type: UserErrorType.USER_DELETE_FAILED;
};

export type InvalidUserIdError = Pick<UserError, "message" | "type"> & {
  type: UserErrorType.INVALID_USER_ID;
};

export type UnknownUserError = Pick<UserError, "message" | "type"> & {
  type: UserErrorType.UNKNOWN_ERROR;
};

export type EmailAlreadyConfirmedError = Pick<UserError, "message" | "type"> & {
  type: UserErrorType.EMAIL_ALREADY_CONFIRMED;
};

export type EmailNotConfirmedError = Pick<UserError, "message" | "type"> & {
  type: UserErrorType.EMAIL_NOT_CONFIRMED;
};

export type PasswordResetExpiredError = Pick<UserError, "message" | "type"> & {
  type: UserErrorType.PASSWORD_RESET_EXPIRED;
};

export type ResetPasswordParams = {
  password: string;
  token: string;
};

export type ConfirmEmailParams = {
  token: string;
};