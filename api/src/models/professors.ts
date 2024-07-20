import {
  Course,
  Grade,
  Professor,
  ProfessorCourse,
  Semester,
} from "@prisma/client";

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
  courses: (Course & { semester: Semester; year: number })[];
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

export function getGradeIndex(grade: Grade): number {
  const gradeMap: { [key in Grade]: number } = {
    A_PLUS: 12,
    A: 11,
    A_MINUS: 10,
    B_PLUS: 9,
    B: 8,
    B_MINUS: 7,
    C_PLUS: 6,
    C: 5,
    C_MINUS: 4,
    D_PLUS: 3,
    D: 2,
    D_MINUS: 1,
    F_PLUS: 0,
    F: 0,
    F_MINUS: 0,
    INCOMPLETE: -1,
    WITHDRAWN: -1,
    NOT_SURE: -1,
    OTHER: -1,
  };
  return gradeMap[grade] || -1;
}

export function getGradeFromIndex(index: number): Grade {
  const grades = [
    "F",
    "D_MINUS",
    "D",
    "D_PLUS",
    "C_MINUS",
    "C",
    "C_PLUS",
    "B_MINUS",
    "B",
    "B_PLUS",
    "A_MINUS",
    "A",
    "A_PLUS",
  ];
  return (grades[index] || "OTHER") as Grade;
}
