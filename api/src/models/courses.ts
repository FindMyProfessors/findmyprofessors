import { Course, Professor, ProfessorCourse } from "@prisma/client";

export type NewCourse = Pick<Course, "name" | "code" | "school_id">;

export type UpdatedCourse = Pick<Course, "name" | "code">;

export type CourseSearchResult = {
  edges: { cursor: string; node: Course }[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null; total: number };
};

export type CourseProfessors = {
  professors: (ProfessorCourse & { professor: Professor })[];
  total: number;
};

export enum CourseErrorType {
  COURSE_NOT_FOUND = "COURSE_NOT_FOUND",
  COURSE_ALREADY_EXISTS = "COURSE_ALREADY_EXISTS",
}

export type CourseError = {
  message: string | { [key: string]: string };
  type: CourseErrorType;
};

export type CourseNotFoundError = Pick<CourseError, "message" | "type"> & {
  type: CourseErrorType.COURSE_NOT_FOUND;
};

export type CourseAlreadyExistsError = Pick<CourseError, "message" | "type"> & {
  type: CourseErrorType.COURSE_ALREADY_EXISTS;
};

export const CourseErrorHttpStatus = {
  [CourseErrorType.COURSE_NOT_FOUND]: 404,
  [CourseErrorType.COURSE_ALREADY_EXISTS]: 409,
};

export function isCourseError(error: any): error is CourseError {
  return (
    typeof error === "object" &&
    error !== null &&
    typeof error.message === "string" &&
    typeof error.type === "string" &&
    Object.values(CourseErrorType).includes(error.type as CourseErrorType)
  );
}
