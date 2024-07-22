import { Professor, Review, ReviewTag } from "@prisma/client";

export type NewReview = Pick<
  Review,
  "quality" | "difficulty" | "time" | "tags" | "grade" | "professor_id"
>;

export type UpdatedReview = Pick<
  Review,
  "quality" | "difficulty" | "time" | "tags" | "grade"
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

export enum Grade {
  A_PLUS,
  A,
  A_MINUS,
  B_PLUS,
  B,
  B_MINUS,
  C_PLUS,
  C,
  C_MINUS,
  D_PLUS,
  D,
  D_MINUS,
  F_PLUS,
  F,
  F_MINUS,
  INCOMPLETE,
  WITHDRAWN,
  NOT_SURE,
  OTHER,
}

export type Rating = {
  ratingAmount: number;
  totalQualityAverage: number;
  topKMostRecentQualityAverage: number;
  totalDifficultyAverage: number;
  topKMostRecentDifficultyAverage: number;
  averageGrade: string; // Assuming Grade is a string, adjust if it's an enum or another type
};

export type TagAmount = {
  tag: ReviewTag;
  amount: number;
};

export type ChartValue = {
  value: number;
  month: string;
  year: number;
};

export type ReviewsByQuality = {
  /**
   * @isInt
   */
  quality: number;
    /**
   * @isInt
   */
  amount: number;
};

export type ProfessorAnalysis = {
  tagAmount: TagAmount[];
  averageRatingValues: ChartValue[];
  numberOfReviewsByQuality: ReviewsByQuality[];
};
