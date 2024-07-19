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
  NewSchool,
  SchoolAlreadyExistsError,
  SchoolErrorType,
  SchoolNotFoundError,
  SchoolSearchResult,
  UpdatedSchool,
} from "../models/schools";
import { logger } from "../utils/logger";
import { AuthErrorType, JWTBody, UnauthorizedError } from "../models/auth";
import { School, UserRole } from "@prisma/client";

const SCHOOL_SEARCH_PAGE_SIZE = 10;

@Route("schools")
@Tags("Schools")
export class SchoolsController extends Controller {
  @SuccessResponse("200", "Schools Retrieved Successfully")
  @Security("jwt")
  @Get("search")
  public async searchSchools(
    @Query() name?: string,
    @Query() cursor?: string,
    @Query() pageSize: number = SCHOOL_SEARCH_PAGE_SIZE
  ): Promise<SchoolSearchResult> {
    const take = pageSize;
    const skip = cursor ? 1 : 0;

    let searchQuery = getSearchQuery(name);

    const result = await prisma.$transaction(async (prisma) => {
      const schools = await prisma.school.findMany({
        where: searchQuery.where! as any,
        orderBy: {
          id: "asc",
        },
        take: take,
        skip: skip,
        cursor: cursor ? { id: parseInt(cursor) } : undefined,
      });

      const edges = schools.map((school) => ({
        cursor: school.id.toString(),
        node: school,
      }));

      const endCursor =
        edges.length > 0 ? edges[edges.length - 1].cursor : null;
      let hasNextPage = schools.length === take;
      if (hasNextPage) {
        // Check that last school is not the same as the last school in the database
        const lastSchool = await prisma.school.findFirst({
          orderBy: {
            id: "desc",
          },
        });
        if (lastSchool && lastSchool.id == schools[schools.length - 1].id) {
          hasNextPage = false;
        }
      }

      // get total with filter
      const total = await prisma.school.count({
        where: searchQuery.where! as any,
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

  @SuccessResponse("201", "School Created Successfully")
  @Response<SchoolAlreadyExistsError>("409", "School already exists")
  @Example<School>({
    id: 1,
    name: "Example School",
  })
  @Security("jwt")
  @Post("create")
  public async createSchool(
    @Request() request: any,
    @Body() body: NewSchool
  ): Promise<School> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_role !== UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You must be an admin to create a school!",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    const school_lookup = await prisma.school.findFirst({
      where: { name: body.name },
    });

    if (school_lookup) {
      const error: SchoolAlreadyExistsError = {
        message: "School already exists",
        type: SchoolErrorType.SCHOOL_ALREADY_EXISTS,
      };
      return Promise.reject(error);
    }

    let school;
    try {
      school = await prisma.school.create({
        data: {
          name: body.name,
        },
      });
    } catch (error: any) {
      logger.error("Failed to create school", error);
      throw new Error("Failed to create school: " + error.message);
    }

    return school;
  }

  @SuccessResponse("200", "School Retrieved Successfully")
  @Response<SchoolNotFoundError>("404", "School not found")
  @Security("jwt")
  @Get("{id}")
  public async getSchool(@Path() id: number): Promise<School> {
    let school = await getSchoolById(id);

    return school;
  }

  @SuccessResponse("200", "School Updated Successfully")
  @Response<SchoolNotFoundError>("404", "School not found")
  @Security("jwt")
  @Put("{id}")
  public async updateSchool(
    @Request() request: any,
    @Path() id: number,
    @Body() body: UpdatedSchool
  ): Promise<School> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_role !== UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You must be an admin to create a school!",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    await getSchoolById(id);

    const updatedSchool = await prisma.school.update({
      where: { id },
      data: {
        name: body.name,
      },
    });

    return updatedSchool;
  }

  @SuccessResponse("200", "School Deleted Successfully")
  @Response<SchoolNotFoundError>("404", "School not found")
  @Security("jwt")
  @Delete("{id}")
  public async deleteSchool(
    @Request() request: any,
    @Path() id: number
  ): Promise<void> {
    const jwt_body = request.user as JWTBody;

    if (jwt_body.user_role !== UserRole.ADMIN) {
      const error: UnauthorizedError = {
        message: "You must be an admin to create a school!",
        type: AuthErrorType.UNAUTHORIZED,
      };
      return Promise.reject(error);
    }

    await getSchoolById(id);

    await prisma.school.delete({
      where: { id },
    });
  }
}

type SchoolORQuery = {
  name?: {
    contains: string;
    mode: string;
  };
};

type SchoolANDQuery = {
  name?: {
    contains: string;
    mode: string;
  };
  OR?: SchoolORQuery[];
};

type SchoolSearchQuery = {
  where?: {
    OR?: SchoolORQuery[];
    AND?: SchoolANDQuery[];
    name?: {
      contains: string;
      mode: string;
    };
  };
};

function getSearchQuery(input?: string): SchoolSearchQuery {
  let query: SchoolSearchQuery = {
    where: {},
  };

  if (input) {
    query.where!.name = {
      contains: input,
      mode: "insensitive",
    };
  }

  return query;
}

async function getSchoolById(id: number): Promise<School> {
  const school = await prisma.school.findUnique({ where: { id } });
  if (!school) {
    const error: SchoolNotFoundError = {
      message: "School not found",
      type: SchoolErrorType.SCHOOL_NOT_FOUND,
    };
    return Promise.reject(error);
  }
  return school;
}
