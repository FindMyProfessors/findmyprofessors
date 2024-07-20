import { Grade, Review, ReviewTag } from "@prisma/client";

export interface NewReview {
  /**
   * @isFloat
   */
  quality: number;
  /**
   * @isFloat
   */
  difficulty: number;
  time: Date;
  tags: ReviewTag[];
  grade: Grade;
  /**
   * @isInt
   */
  professor_id: number;
}

export interface UpdatedReview {
  /**
   * @isFloat
   */
  quality?: number;
  /**
   * @isFloat
   */
  difficulty?: number;
  time?: Date;
  tags?: ReviewTag[];
  grade?: Grade;
}

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
  edges: { cursor: string; node: ReviewResponse }[];
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

export type Rating = {
  /**
   * @isInt
   */
  ratingAmount: number;
  /**
   * @isFloat
   */
  totalQualityAverage: number;
  /**
   * @isFloat
   */
  topKMostRecentQualityAverage: number;
  /**
   * @isFloat
   */
  totalDifficultyAverage: number;
  /**
   * @isFloat
   */
  topKMostRecentDifficultyAverage: number;
  /**
   * @isString
   */
  averageGrade: Grade; // Assuming Grade is a string, adjust if it's an enum or another type
};

export interface ReviewResponse  {
  /**
   * @isInt
   */
  id: number;
  /**
   * @isFloat
   */
  quality: number;
  /**
   * @isFloat
   */
  difficulty: number;
  time: Date;
  tags: ReviewTag[];
  grade: Grade;
  /**
   * @isInt
   */
  professor_id: number;
}


export type TagAmount = {
  tag: ReviewTag;
  amount: number;
};

export type ChartValue = {
  value: number;
  month: string;
  year: number;
};

export type ProfessorAnalysis = {
  tagAmount: TagAmount[];
  averageRatingValues: ChartValue[];
};
