import { User } from "@prisma/client";
import { UserResponse } from "./users";

export type RegistrationParams = Pick<User, "email" | "username" | "password">;

export type LoginParams = Pick<User, "username" | "password">;

export type LoginResponse = { token: string; user: UserResponse };
