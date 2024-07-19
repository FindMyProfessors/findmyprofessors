import { User, UserRole } from "@prisma/client";
import { UserResponse } from "./users";

export type RegistrationParams = Pick<User, "email" | "username" | "password">;

export type LoginParams = Pick<User, "username" | "password">;

export type LoginResponse = { token: string; user: UserResponse };

export type JWTBody = {
  user_id: number;
  user_role: UserRole;
};

// Create types for error handling, invalid password, user does not exist, user already exists, etc

export enum AuthErrorType {
  INVALID_PASSWORD = "INVALID_PASSWORD",
  PASSWORD_TOO_SHORT = "PASSWORD_TOO_SHORT",
  PASSWORD_TOO_LONG = "PASSWORD_TOO_LONG",
  PASSWORD_MISSING_UPPERCASE = "PASSWORD_MISSING_UPPERCASE",
  PASSWORD_MISSING_NUMBER = "PASSWORD_MISSING_NUMBER",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
  UNAUTHORIZED = "UNAUTHORIZED",
  INVALID_USERNAME = "INVALID_USERNAME",
  INVALID_TOKEN = "INVALID_TOKEN",
  UNABLE_TO_CREATE_JWT = "UNABLE_TO_CREATE_JWT", // Added unable to create JWT error type
  UNKNOWN_ERROR = "UNKNOWN_ ERROR",
}

export const AuthErrorHttpStatus = {
  [AuthErrorType.INVALID_PASSWORD]: 401,
  [AuthErrorType.PASSWORD_TOO_SHORT]: 400,
  [AuthErrorType.PASSWORD_TOO_LONG]: 400,
  [AuthErrorType.PASSWORD_MISSING_UPPERCASE]: 400,
  [AuthErrorType.PASSWORD_MISSING_NUMBER]: 400,
  [AuthErrorType.USER_NOT_FOUND]: 404,
  [AuthErrorType.USER_ALREADY_EXISTS]: 409,
  [AuthErrorType.INVALID_USERNAME]: 400,
  [AuthErrorType.UNAUTHORIZED]: 401,
  [AuthErrorType.INVALID_TOKEN]: 401,
  [AuthErrorType.UNABLE_TO_CREATE_JWT]: 500, // HTTP status for unable to create JWT
  [AuthErrorType.UNKNOWN_ERROR]: 500,
};

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

export type PasswordMissingUppercaseError = Pick<
  AuthError,
  "message" | "type"
> & {
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

export type InvalidTokenError = Pick<AuthError, "message" | "type"> & {
  type: AuthErrorType.INVALID_TOKEN;
};

export type UnableToCreateJwtError = Pick<AuthError, "message" | "type"> & {
  type: AuthErrorType.UNABLE_TO_CREATE_JWT; // Added unable to create JWT error type
};

export type UnknownAuthError = Pick<AuthError, "message" | "type"> & {
  type: AuthErrorType.UNKNOWN_ERROR;
};

export type UnauthorizedError = Pick<AuthError, "message"> & {
  type: AuthErrorType.UNAUTHORIZED;
};
