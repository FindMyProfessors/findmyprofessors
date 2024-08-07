
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
  Path,
} from "tsoa";
import { prisma } from "../database/database";
import {
  CourseEnrollment,
  CourseEnrollmentResult,
  NewProfessor,
  ProfessorAlreadyExistsError,
  ProfessorCourses,
  ProfessorErrorType,
  ProfessorNotFoundError,
  ProfessorSearchResult,
  UpdatedProfessor,
  getGradeFromIndex,
  getGradeIndex,
} from "../models/professors";
import { logger } from "../utils/logger";
import { AuthErrorType, JWTBody, UnauthorizedError } from "../models/auth";
import { Professor, Review, Semester, UserRole } from "@prisma/client";
import { SchoolErrorType, SchoolNotFoundError } from "../models/schools";
import {
  ProfessorAnalysis,
  Rating,
  ReviewResponse,
  ReviewsSearchResult,
} from "../models/reviews";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CourseError, CourseErrorType } from "../models/courses";
import { beginAnalysis } from "../analysis";

const PROFESSOR_SEARCH_PAGE_SIZE = 10;
const REVIEW_SEARCH_PAGE_SIZE = 25;

@Route("professors")
@Tags("Professors")
export class ProfessorsController extends Controller {
  @SuccessResponse("200", "Professors Retrieved Successfully")
  @Security("jwt")
  @Get("search")
  public async searchProfessors(
    @Query() name?: string,
    @Query() school_id?: number,
    @Query() cursor?: string,
    @Query() pageSize: number = PROFESSOR_SEARCH_PAGE_SIZE
  ): Promise<ProfessorSearchResult> {
    // print this
    logger.info(`name=${name}`);
    logger.info(`cursor=${cursor}`);
    logger.info(`pageSize=${pageSize}`);
    logger.info(`school_id=${school_id}`);

    const take = pageSize;
    const skip = cursor ? 1 : 0;

    let searchQuery: SearchQuery = getSearchQuery(name, school_id);
    logger.info("searchQuery=", searchQuery);

    const result = await prisma.$transaction(async (prisma) => {
      const professors = await prisma.professor.findMany({
        where: searchQuery.where as any,
        orderBy: {
          id: "asc",
        },
        take: take,
        skip: skip,
        cursor: cursor ? { id: parseInt(cursor) } : undefined,
      });

      // Print professors
      logger.info("professors=", professors);

      const edges = professors.map((professor) => ({
        cursor: professor.id.toString(),
        node: professor,
      }));
      logger.info("edges=", edges);

      const endCursor =
        edges.length > 0 ? edges[edges.length - 1].cursor : null;
      let hasNextPage = professors.length === take;
      if (hasNextPage) {
        // Check that last professor is not the same as the last professor in the database
        const lastProfessor = await prisma.professor.findFirst({
          where: searchQuery.where as any,
          orderBy: {
            id: "asc",
          },
        });
        if (
          lastProfessor &&
          lastProfessor.id == professors[professors.length - 1].id
        ) {
          hasNextPage = false;
        }
      }
      logger.info("hasNextPage=", hasNextPage);

      // get total with filter
      const total = await prisma.professor.count({
        where: searchQuery.where as any,
      });
      logger.info("total=", total);

      return {
        edges: edges,
        pageInfo: {
          hasNextPage: hasNextPage,
          endCursor: endCursor,
          total: total,
        },
      };
    });

    return result;
  }

  @SuccessResponse("201", "Professor Created Successfully")
  @Response<ProfessorAlreadyExistsError>("409", "Professor already exists")
  @Example<Professor>({
    id: 1,
    first_name: "Example",
    last_name: "Professor",
    rmp_id: "hfaksjdfhuicyv",
    school_id: 1,
  })
  @Security("jwt")
  @Post("create")
  public async createProfessor(
    @Request() request: any,
    @Body() body: NewProfessor
  ): Promise<Professor> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_role !== UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You must be an admin to create a professor!",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    // Validate that a school with the school_id exists
    const school = await prisma.school.findUnique({
      where: { id: body.school_id },
    });
    if (!school) {
      const error: SchoolNotFoundError = {
        message: "School not found",
        type: SchoolErrorType.SCHOOL_NOT_FOUND,
      };
      return Promise.reject(error);
    }

    let professor;
    try {
      professor = await prisma.professor.create({
        data: {
          first_name: body.first_name,
          last_name: body.last_name,
          school_id: body.school_id,
          rmp_id: body.rmp_id,
        },
      });
    } catch (error: any) {
      logger.error("Failed to create professor", error);
      throw new Error("Failed to create professor: " + error.message);
    }

    return professor;
  }

  // Add this new endpoint to the ProfessorsController class
  @SuccessResponse("200", "Professor Analysis Retrieved Successfully")
  @Response<ProfessorNotFoundError>("404", "Professor not found")
  @Security("jwt")
  @Get("{id}/analysis")
  public async getProfessorAnalysis(id: number): Promise<ProfessorAnalysis> {
    await getProfessorById(id);
    const reviews = await prisma.review.findMany({
      where: { professor_id: id },
      orderBy: { time: "desc" },
    });

    if (reviews.length === 0) {
      throw new Error("No reviews found for this professor");
    }

    return await beginAnalysis(reviews);
  }

  @SuccessResponse("200", "Rating Retrieved Successfully")
  @Response<ProfessorNotFoundError>("404", "Professor not found")
  @Security("jwt")
  @Get("{id}/rating")
  public async getProfessorRating(
    @Path() id: number,
    @Query() topKPercentage: number = 25
  ): Promise<Rating | null> {
    const professor = await prisma.professor.findUnique({ where: { id } });
    if (!professor) {
      const error: ProfessorNotFoundError = {
        message: "Professor not found",
        type: ProfessorErrorType.PROFESSOR_NOT_FOUND,
      };
      return Promise.reject(error);
    }

    const reviews = await prisma.review.findMany({
      where: { professor_id: id },
      orderBy: { time: "desc" },
    });

    const total = reviews.length;
    const rating: Rating = {
      ratingAmount: total,
      totalQualityAverage: 0,
      totalDifficultyAverage: 0,
      topKMostRecentQualityAverage: 0,
      topKMostRecentDifficultyAverage: 0,
      averageGrade: "OTHER",
    };

    if (total === 0) {
      return null;
    }

    if (topKPercentage && (topKPercentage < 1 || topKPercentage > 100)) {
      throw new Error("topKPercentage must be in [1, 100]");
    }

    // conver to decimal
    topKPercentage = topKPercentage / 100;

    const topKTotal = topKPercentage
      ? Math.floor(total * (1 - topKPercentage))
      : 0;
    const topKStartIndex = Math.max(0, total - topKTotal - 1);

    let totalQualitySum = 0;
    let totalDifficultySum = 0;
    let topKQualitySum = 0;
    let topKDifficultySum = 0;
    let gradeIndexSum = 0;
    let totalGrades = 0;

    for (let i = 0; i < total; i++) {
      const review = reviews[i];
      totalQualitySum += review.quality;
      totalDifficultySum += review.difficulty || 0;

      if (topKPercentage && i > topKStartIndex) {
        topKQualitySum += review.quality;
        topKDifficultySum += review.difficulty || 0;
      }

      if (review.grade) {
        const gradeIndex = getGradeIndex(review.grade);
        if (gradeIndex !== -1) {
          gradeIndexSum += gradeIndex;
          totalGrades++;
        }
      }
    }

    rating.totalQualityAverage = totalQualitySum / total;
    rating.totalDifficultyAverage = totalDifficultySum / total;

    if (topKTotal > 0) {
      rating.topKMostRecentQualityAverage = topKQualitySum / topKTotal;
      rating.topKMostRecentDifficultyAverage = topKDifficultySum / topKTotal;
    } else {
      rating.topKMostRecentQualityAverage = rating.totalQualityAverage;
      rating.topKMostRecentDifficultyAverage = rating.totalDifficultyAverage;
    }

    if (totalGrades > 0) {
      rating.averageGrade = getGradeFromIndex(
        Math.floor(gradeIndexSum / totalGrades)
      );
    }

    return rating;
  }

  @SuccessResponse("200", "Professor Retrieved Successfully")
  @Response<ProfessorNotFoundError>("404", "Professor not found")
  @Security("jwt")
  @Get("{id}")
  public async getProfessor(id: number): Promise<Professor> {
    let professor = await getProfessorById(id);

    return professor;
  }

  @SuccessResponse("200", "Courses Retrieved Successfully")
  @Response<ProfessorNotFoundError>("404", "Professor not found")
  @Security("jwt")
  @Get("{id}/courses")
  public async getProfessorCourses(
    id: number,
    @Query() year?: number,
    @Query() semester?: Semester
  ): Promise<ProfessorCourses> {
    await getProfessorById(id);

    const profesor = await prisma.professor.findUnique({
      where: {
        id: id,
        courses: {
          every: {
            year: year,
            semester: semester,
          },
        },
      },
      include: {
        courses: {
          include: {
            course: true,
          },
        },
        _count: {
          select: { courses: true },
        },
      },
    });

    if (!profesor) {
      const error: ProfessorNotFoundError = {
        message: "Professor not found",
        type: ProfessorErrorType.PROFESSOR_NOT_FOUND,
      };
      return Promise.reject(error);
    }

    let a = {
      courses: profesor?.courses.map((pc) => ({
        ...pc.course,
        year: pc.year,
        semester: pc.semester,
      })),
      total: profesor?._count.courses,
    } as ProfessorCourses;

    return a;
  }

  @SuccessResponse("200", "Professor Updated Successfully")
  @Response<ProfessorNotFoundError>("404", "Professor not found")
  @Security("jwt")
  @Put("{id}")
  public async updateProfessor(
    @Request() request: any,
    id: number,
    @Body() body: UpdatedProfessor
  ): Promise<Professor> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_role !== UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You must be an admin to update a professor!",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    await getProfessorById(id);

    const data: any = {};
    if (body.first_name !== undefined && body.first_name !== null) {
      data.first_name = body.first_name;
    }
    if (body.last_name !== undefined && body.last_name !== null) {
      data.last_name = body.last_name;
    }

    const updatedProfessor = await prisma.professor.update({
      where: { id },
      data: data,
    });

    return updatedProfessor;
  }

  @SuccessResponse("200", "Professor Deleted Successfully")
  @Response<ProfessorNotFoundError>("404", "Professor not found")
  @Security("jwt")
  @Delete("{id}")
  public async deleteProfessor(
    @Request() request: any,
    id: number
  ): Promise<void> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_role !== UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You must be an admin to delete a professor!",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    await getProfessorById(id);


    // delete professorCourses
    await prisma.professorCourse.deleteMany({
      where: { professor: { id: id } },
    });

    await prisma.review.deleteMany({
      where: { professor: { id: id } },
    });

    await prisma.professor.delete({
      where: { id },
    });
  }

  @SuccessResponse("200", "Reviews Retrieved Successfully")
  @Security("jwt")
  @Get("{id}/reviews")
  public async getReviews(
    @Request() request: any,
    id: number,
    @Query() cursor?: string,
    @Query() pageSize: number = REVIEW_SEARCH_PAGE_SIZE
  ): Promise<ReviewsSearchResult> {
    // print this
    logger.info(`cursor=${cursor}`);
    logger.info(`pageSize=${pageSize}`);

    const take = pageSize;
    const skip = cursor ? 1 : 0;

    const result = await prisma.$transaction(async (prisma) => {
      const professor = await getProfessorById(id);

      const reviews = await prisma.review.findMany({
        where: {
          professor_id: id,
        },
        orderBy: {
          time: "desc",
        },
        take: take,
        skip: skip,

        cursor: cursor ? { id: parseInt(cursor) } : undefined,
      });

      // Print professors
      logger.info("reviews=", reviews);

      const edges = reviews.map((review) => ({
        cursor: review.id.toString(),
        node: review as ReviewResponse,
      }));
      logger.info("edges=", edges);

      const endCursor =
        edges.length > 0 ? edges[edges.length - 1].cursor : null;
      let hasNextPage = reviews.length === take;
      if (hasNextPage) {
        // Check that last professor is not the same as the last professor in the database
        const lastReview = await prisma.review.findFirst({
          where: {
            professor_id: id,
          },
          orderBy: {
            time: "asc",
          },
        });
        if (lastReview && lastReview.id == reviews[reviews.length - 1].id) {
          hasNextPage = false;
        }
      }
      logger.info("hasNextPage=", hasNextPage);

      // get total with filter
      const total = await prisma.review.count({
        where: {
          professor_id: id,
        },
      });
      logger.info("total=", total);

      return {
        edges: edges,
        pageInfo: {
          hasNextPage: hasNextPage,
          endCursor: endCursor,
          total: total,
        },
      };
    });

    return result;
  }

  @SuccessResponse("201", "Review Created Successfully")
  @Security("jwt")
  @Post("{id}/enroll")
  public async enroll(
    @Request() request: any,
    id: number,
    @Body() body: CourseEnrollment
  ): Promise<CourseEnrollmentResult> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_role !== UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You must be an admin to create a review!",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    await getProfessorById(id);

    let enrollment;
    try {
      enrollment = await prisma.professorCourse.create({
        data: {
          ...body,
          professor_id: id,
        },
      });
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          const error: CourseError = {
            message: "Course enrollment already exists",
            type: CourseErrorType.COURSE_ALREADY_EXISTS,
          };
          return Promise.reject(error);
        }
      }
      logger.error("Failed to create enrollment", error);
      throw new Error("Failed to create enrollment: " + error.message);
    }

    return enrollment as CourseEnrollmentResult;
  }
}

type ORQuery = {
  first_name?: {
    contains: string;
  };
  last_name?: {
    contains: string;
  };
  school_id?: number;
};

type ANDQuery = {
  first_name?: {
    contains: string;
  };
  last_name?: {
    contains: string;
  };
  OR?: ORQuery[];
};

type SearchQuery = {
  where?: {
    OR?: ORQuery[];
    AND?: ANDQuery[];
    school_id?: number;
  };
};

function getSearchQuery(input?: string, school_id?: number): SearchQuery {
  let query: SearchQuery = {
    where: {},
  };

  if (input) {
    const splitQuery = input.split(" ");
    if (splitQuery.length > 1) {
      let ors = splitQuery.map((word) => ({
        OR: [
          { first_name: { contains: word } },
          { last_name: { contains: word } },
        ],
      }));
      query.where!.AND! = ors;
    } else {
      query.where!.OR = [
        { first_name: { contains: input } },
        { last_name: { contains: input } },
      ];
    }
  }

  if (school_id) {
    query.where!.school_id = school_id;
  }

  return query;
}

export async function getProfessorById(id: number): Promise<Professor> {
  const professor = await prisma.professor.findUnique({ where: { id } });
  if (!professor) {
    const error: ProfessorNotFoundError = {
      message: "Professor not found",
      type: ProfessorErrorType.PROFESSOR_NOT_FOUND,
    };
    return Promise.reject(error);
  }
  return professor;
}
