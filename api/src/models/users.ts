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
>;
