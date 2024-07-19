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
import { prisma } from "../database/database";
import {
  NewCourse,
  CourseAlreadyExistsError,
  CourseErrorType,
  CourseNotFoundError,
  CourseSearchResult,
  UpdatedCourse,
  CourseProfessors,
} from "../models/courses";
import { logger } from "../utils/logger";
import { AuthErrorType, JWTBody, UnauthorizedError } from "../models/auth";
import { Course, Prisma, Professor, Semester, UserRole } from "@prisma/client";

const COURSE_SEARCH_PAGE_SIZE = 10;

@Route("courses")
@Tags("Courses")
export class CoursesController extends Controller {
  @SuccessResponse("200", "Courses Retrieved Successfully")
  @Security("jwt")
  @Get("search")
  public async searchCourses(
    @Query() school_id: number,
    @Query() query?: string,
    @Query() semester?: Semester,
    @Query() year?: number,
    @Query() cursor?: string,
    @Query() pageSize: number = COURSE_SEARCH_PAGE_SIZE
  ): Promise<CourseSearchResult> {
    const take = pageSize;
    const skip = cursor ? 1 : 0;

    let searchClause = getSearchQuery(school_id, query, semester, year);

    const result = await prisma.$transaction(async (prisma) => {
      const courses = await prisma.professorCourse.findMany({
        where: searchClause,
        include: {
          course: true,
        },
        orderBy: {
          course: {
            id: "asc",
          },
        },
        take: take,
        skip: skip,
        cursor: cursor ? { id: parseInt(cursor) } : undefined,
      });

      const edges = courses.map((course) => ({
        cursor: course.course.id.toString(),
        node: course.course,
      }));

      const endCursor =
        edges.length > 0 ? edges[edges.length - 1].cursor : null;
      let hasNextPage = courses.length === take;
      if (hasNextPage) {
        const lastCourse = await prisma.course.findFirst({
          orderBy: {
            id: "asc",
          },
        });
        if (lastCourse && lastCourse.id == courses[courses.length - 1].id) {
          hasNextPage = false;
        }
      }

      const total = await prisma.professorCourse.count({
        where: searchClause,
      });

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

  @SuccessResponse("201", "Course Created Successfully")
  @Response<CourseAlreadyExistsError>("409", "Course already exists")
  @Example<Course>({
    id: 1,
    name: "Example Course",
    code: "EX101",
    school_id: 1,
  })
  @Security("jwt")
  @Post("create")
  public async createCourse(
    @Request() request: any,
    @Body() body: NewCourse
  ): Promise<Course> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_role !== UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You must be an admin to create a course!",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    const course_lookup = await prisma.course.findFirst({
      where: { code: body.code },
    });

    if (course_lookup) {
      const error: CourseAlreadyExistsError = {
        message: "Course already exists",
        type: CourseErrorType.COURSE_ALREADY_EXISTS,
      };
      return Promise.reject(error);
    }

    let course;
    try {
      course = await prisma.course.create({
        data: {
          name: body.name,
          code: body.code,
          school_id: body.school_id,
        },
      });
    } catch (error: any) {
      logger.error("Failed to create course", error);
      throw new Error("Failed to create course: " + error.message);
    }

    return course;
  }

  @SuccessResponse("200", "Course Retrieved Successfully")
  @Response<CourseNotFoundError>("404", "Course not found")
  @Security("jwt")
  @Get("{id}")
  public async getCourse(id: number): Promise<Course> {
    let course = await getCourseById(id);

    return course;
  }

  @SuccessResponse("200", "Course Updated Successfully")
  @Response<CourseNotFoundError>("404", "Course not found")
  @Security("jwt")
  @Put("{id}")
  public async updateCourse(
    @Request() request: any,
    id: number,
    @Body() body: UpdatedCourse
  ): Promise<Course> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_role !== UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You must be an admin to update a course!",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    await getCourseById(id);

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        name: body.name,
        code: body.code,
      },
    });

    return updatedCourse;
  }

  @SuccessResponse("200", "Course Deleted Successfully")
  @Response<CourseNotFoundError>("404", "Course not found")
  @Security("jwt")
  @Delete("{id}")
  public async deleteCourse(
    @Request() request: any,
    id: number
  ): Promise<void> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_role !== UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You must be an admin to delete a course!",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    await getCourseById(id);

    await prisma.course.delete({
      where: { id },
    });
  }

  @SuccessResponse("200", "Professors Retrieved Successfully")
  @Response<CourseNotFoundError>("404", "Course not found")
  @Security("jwt")
  @Get("{id}/professors")
  public async getCourseProfessors(
    id: number,
    @Query() year: number,
    @Query() semester: Semester
  ): Promise<CourseProfessors> {
    await getCourseById(id);

    const professors = await prisma.professorCourse.findMany({
      where: {
        id: id,
        year: year,
        semester: semester,
      },
      include: {
        professor: true,
      },
    });

    const result: CourseProfessors = {
      professors: professors.map((pc) => ({
        id: pc.id,
        professor_id: pc.professor.id,
        course_id: pc.course_id,
        year: year,
        semester: semester,
        professor: {
          id: pc.professor.id,
          first_name: pc.professor.first_name,
          last_name: pc.professor.last_name,
          rmp_id: pc.professor.rmp_id,
          school_id: pc.professor.school_id,
        },
      })),
      total: professors.length,
    };

    return result;
  }
}

async function getCourseById(id: number): Promise<Course> {
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) {
    const error: CourseNotFoundError = {
      message: "Course not found",
      type: CourseErrorType.COURSE_NOT_FOUND,
    };
    return Promise.reject(error);
  }
  return course;
}

function getSearchQuery(
  school_id: number,
  query?: string,
  semester?: Semester,
  year?: number
): Prisma.ProfessorCourseFindManyArgs["where"] {
  let where: Prisma.ProfessorCourseFindManyArgs["where"] = {
    course: {
      school_id: school_id,
    },
  };

  if (semester) {
    where.semester = semester;
  }

  if (year) {
    where.year = year;
  }

  if (query) {
    where.AND = {
      OR: [
        { course: { name: { contains: query, mode: "insensitive" } } },
        { course: { code: { contains: query, mode: "insensitive" } } },
      ],
    };
  }

  return where;
}
