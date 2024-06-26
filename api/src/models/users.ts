import { User } from "@prisma/client";

export type UserCreationParams = Pick<User, "email" | "username" | "password">;

export type UserResponse = Omit<User, "password">;


