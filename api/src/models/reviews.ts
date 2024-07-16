import { Review } from "@prisma/client";

export type NewReview = Pick<
  Review,
  "quality" | "difficult" | "time" | "tags" | "grade"
>;

export type UpdatedReview = Pick<
  Review,
  "quality" | "difficult" | "time" | "tags" | "grade"
>;

export interface ReviewNotFoundError {
  message: string;
  type: ReviewErrorType;
}

export enum ReviewErrorType {
  REVIEW_NOT_FOUND = "REVIEW_NOT_FOUND",
}
