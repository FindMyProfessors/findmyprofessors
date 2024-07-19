import { Professor, Review } from "@prisma/client";

export type NewReview = Pick<
  Review,
  "quality" | "difficult" | "time" | "tags" | "grade" | "professor_id"
>;

export type UpdatedReview = Pick<
  Review,
  "quality" | "difficult" | "time" | "tags" | "grade"
>;

export type ReviewError = {
  message: string | { [key: string]: string };
  type: ReviewErrorType;
};

export type ReviewNotFoundError = Pick<ReviewError, "message" | "type"> & {
  type: ReviewErrorType.REVIEW_NOT_FOUND;
};

export enum ReviewErrorType {
  REVIEW_NOT_FOUND = "REVIEW_NOT_FOUND",
}

export type ReviewsSearchResult = {
  edges: { cursor: string; node: Review }[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null; total: number };
};

export const ReviewErrorHttpStatus = {
  [ReviewErrorType.REVIEW_NOT_FOUND]: 404,
};

export function isReviewError(error: any): error is ReviewError {
  return (
    typeof error === "object" &&
    error !== null &&
    typeof error.message === "string" &&
    typeof error.type === "string" &&
    Object.values(ReviewErrorType).includes(error.type as ReviewErrorType)
  );
}
