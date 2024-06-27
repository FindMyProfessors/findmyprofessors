import { User } from "@prisma/client";
import { UserResponse } from "./users";

export type RegistrationParams = Pick<User, "email" | "username" | "password">;

export type LoginParams = Pick<User, "username" | "password">;

export type LoginResponse = { token: string; user: UserResponse };

// Create types for error handling, invalid password, user does not exist, user already exists, etc

export enum AuthErrorType {
  INVALID_PASSWORD = "INVALID_PASSWORD",
  PASSWORD_TOO_SHORT = "PASSWORD_TOO_SHORT",
  PASSWORD_TOO_LONG = "PASSWORD_TOO_LONG",
  PASSWORD_MISSING_UPPERCASE = "PASSWORD_MISSING_UPPERCASE",
  PASSWORD_MISSING_NUMBER = "PASSWORD_MISSING_NUMBER",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
  INVALID_USERNAME = "INVALID_USERNAME",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export type AuthError = {
  message: string | { [key: string]: string };
  type: AuthErrorType;
};

export function isAuthError(error: any): error is AuthError {
  return (
    typeof error === "object" &&
    error !== null &&
    typeof error.message === "string" &&
    typeof error.type === "string" &&
    Object.values(AuthErrorType).includes(error.type as AuthErrorType)
  );
}

export type InvalidPasswordError = Pick<AuthError, "message" | "type"> & {
  type: AuthErrorType.INVALID_PASSWORD;
};

export type PasswordTooShortError = Pick<AuthError, "message" | "type"> & {
  type: AuthErrorType.PASSWORD_TOO_SHORT;
};

export type PasswordTooLongError = Pick<AuthError, "message" | "type"> & {
  type: AuthErrorType.PASSWORD_TOO_LONG;
};

export type PasswordMissingUppercaseError = Pick<AuthError, "message" | "type"> & {
  type: AuthErrorType.PASSWORD_MISSING_UPPERCASE;
};

export type PasswordMissingNumberError = Pick<AuthError, "message" | "type"> & {
  type: AuthErrorType.PASSWORD_MISSING_NUMBER;
};

export type UserNotFoundError = Pick<AuthError, "message" | "type"> & {
  type: AuthErrorType.USER_NOT_FOUND;
};

export type UserAlreadyExistsError = Pick<AuthError, "message" | "type"> & {
  type: AuthErrorType.USER_ALREADY_EXISTS;
};

export type InvalidUsernameError = Pick<AuthError, "message" | "type"> & {
  type: AuthErrorType.INVALID_USERNAME;
};

export type UnknownAuthError = Pick<AuthError, "message" | "type"> & {
  type: AuthErrorType.UNKNOWN_ERROR;
};
