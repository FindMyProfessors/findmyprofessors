import { Course, Professor, ProfessorCourse } from "@prisma/client";

export type NewProfessor = Pick<
  Professor,
  "first_name" | "last_name" | "rmp_id" | "school_id"
>;

export type UpdatedProfessor = {
  first_name?: string | null;
  last_name?: string | null;
};

export type ProfessorSearchResult = {
  edges: { cursor: string; node: Professor }[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null; total: number };
};


export type ProfessorCourses = {
  courses: (Omit<ProfessorCourse, "professor_id" | "id" | "course_id"> & Course)[];
  total: number;
};

export type CourseEnrollment = Omit<ProfessorCourse, "professor_id" | "id">;


export type CourseEnrollmentResult = ProfessorCourse;

export enum ProfessorErrorType {
  PROFESSOR_NOT_FOUND = "PROFESSOR_NOT_FOUND",
  PROFESSOR_ALREADY_EXISTS = "PROFESSOR_ALREADY_EXISTS",
}

export type ProfessorError = {
  message: string | { [key: string]: string };
  type: ProfessorErrorType;
};

export type ProfessorNotFoundError = Pick<
  ProfessorError,
  "message" | "type"
> & {
  type: ProfessorErrorType.PROFESSOR_NOT_FOUND;
};

export type ProfessorAlreadyExistsError = Pick<
  ProfessorError,
  "message" | "type"
> & {
  type: ProfessorErrorType.PROFESSOR_ALREADY_EXISTS;
};

export const ProfessorErrorHttpStatus = {
  [ProfessorErrorType.PROFESSOR_NOT_FOUND]: 404,
  [ProfessorErrorType.PROFESSOR_ALREADY_EXISTS]: 409,
};

export function isProfessorError(error: any): error is ProfessorError {
  return (
    typeof error === "object" &&
    error !== null &&
    typeof error.message === "string" &&
    typeof error.type === "string" &&
    Object.values(ProfessorErrorType).includes(error.type as ProfessorErrorType)
  );
}
