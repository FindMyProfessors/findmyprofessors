import { Review, UserRole } from "@prisma/client";
import { prisma } from "../database/database";
import {
  ReviewErrorType,
  ReviewNotFoundError,
  UpdatedReview,
} from "../models/reviews";
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Route,
  SuccessResponse,
  Response,
  Tags,
  Example,
  Request,
  Security,
  Query,
} from "tsoa";
import { AuthErrorType, JWTBody, UnauthorizedError } from "../models/auth";

@Route("reviews")
@Tags("Reviews")
export class ReviewsController extends Controller {
  @SuccessResponse("200", "Review Retrieved Successfully")
  @Response<ReviewNotFoundError>("404", "Review not found")
  @Security("jwt")
  @Get("reviews/{review_id}")
  public async getReview(review_id: number): Promise<Review> {
    const review = await prisma.review.findUnique({ where: { id: review_id } });

    if (!review) {
      const error: ReviewNotFoundError = {
        message: "Review not found",
        type: ReviewErrorType.REVIEW_NOT_FOUND,
      };
      return Promise.reject(error);
    }

    return review;
  }

  @SuccessResponse("200", "Review Updated Successfully")
  @Response<ReviewNotFoundError>("404", "Review not found")
  @Security("jwt")
  @Put("reviews/{review_id}")
  public async updateReview(
    @Request() request: any,

    review_id: number,
    @Body() body: UpdatedReview
  ): Promise<Review> {
    const jwt_body = request.user as JWTBody;
    if (jwt_body.user_role !== UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You must be an admin to delete a review!",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    const review = await prisma.review.findUnique({ where: { id: review_id } });

    if (!review) {
      const error: ReviewNotFoundError = {
        message: "Review not found",
        type: ReviewErrorType.REVIEW_NOT_FOUND,
      };
      return Promise.reject(error);
    }

    const updatedReview = await prisma.review.update({
      where: { id: review_id },
      data: {
        ...body,
      },
    });

    return updatedReview;
  }

  @SuccessResponse("200", "Review Deleted Successfully")
  @Response<ReviewNotFoundError>("404", "Review not found")
  @Security("jwt")
  @Delete("reviews/{review_id}")
  public async deleteReview(
    @Request() request: any,

    review_id: number
  ): Promise<void> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_role !== UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You must be an admin to delete a review!",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    const review = await prisma.review.findUnique({ where: { id: review_id } });

    if (!review) {
      const error: ReviewNotFoundError = {
        message: "Review not found",
        type: ReviewErrorType.REVIEW_NOT_FOUND,
      };
      return Promise.reject(error);
    }

    await prisma.review.delete({ where: { id: review_id } });
  }
}
