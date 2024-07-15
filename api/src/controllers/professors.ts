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
  NewProfessor,
  ProfessorAlreadyExistsError,
  ProfessorCourses,
  ProfessorErrorType,
  ProfessorNotFoundError,
  ProfessorSearchResult,
  UpdatedProfessor,
} from "../models/professors";
import { logger } from "../utils/logger";
import { AuthErrorType, JWTBody, UnauthorizedError } from "../models/auth";
import { Professor, Semester, UserRole } from "@prisma/client";
import { SchoolErrorType, SchoolNotFoundError } from "../models/schools";

const PROFESSOR_SEARCH_PAGE_SIZE = 10;

@Route("professors")
@Tags("Professors")
export class ProfessorsController extends Controller {
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
    //let professor = await getProfessorById(id);

    const profesor = await prisma.professor.findFirst({
      relationLoadStrategy: "join", // or 'query'
      where: {
        id: id,
      },
      include: {
        courses: {
          where: {
            year: year,
            semester: semester,
          },
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
        courses: profesor?.courses,
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

    await prisma.professor.delete({
      where: { id },
    });
  }

  @SuccessResponse("200", "Professors Retrieved Successfully")
  @Security("jwt")
  @Get("search/{name}")
  public async searchProfessors(
    name: string,
    @Query() cursor?: string,
    @Query() pageSize: number = PROFESSOR_SEARCH_PAGE_SIZE
  ): Promise<ProfessorSearchResult> {
    // print this
    logger.info(`name=${name}`);
    logger.info(`cursor=${cursor}`);
    logger.info(`pageSize=${pageSize}`);

    const take = pageSize;
    const skip = cursor ? 1 : 0;

    let searchQuery: SearchQuery = getSearchQuery(name);
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
            id: "desc",
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
}

type ORQuery = {
  first_name?: {
    contains: string;
  };
  last_name?: {
    contains: string;
  };
};

type ANDQuery = {
  first_name?: {
    contains: string;
  };
  last_name?: {
    contains: string;
  };
  OR: ORQuery[];
};

type SearchQuery = {
  where?: {
    OR?: ORQuery[];
    AND?: ANDQuery[];
  };
};

function getSearchQuery(input: string): SearchQuery {
  const splitQuery = input.split(" ");

  let query: SearchQuery = { where: {} };
  if (splitQuery.length > 1) {
    query.where!.AND = splitQuery.map((word) => ({
      OR: [
        { first_name: { contains: word } },
        { last_name: { contains: word } },
      ],
    }));
  } else {
    query.where!.OR = [
      { first_name: { contains: input } },
      { last_name: { contains: input } },
    ];
  }
  return query;
}

async function getProfessorById(id: number): Promise<Professor> {
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
