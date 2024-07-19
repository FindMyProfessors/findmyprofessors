import { School } from "@prisma/client";

export type NewSchool = Pick<School, "name">;

export type UpdatedSchool = Pick<School, "name">;

export type SchoolSearchResult = {
  edges: { cursor: string; node: School }[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null; total: number };
};

export enum SchoolErrorType {
  SCHOOL_NOT_FOUND = "SCHOOL_NOT_FOUND",
  SCHOOL_ALREADY_EXISTS = "SCHOOL_ALREADY_EXISTS",
}

export type SchoolError = {
  message: string | { [key: string]: string };
  type: SchoolErrorType;
};

export type SchoolNotFoundError = Pick<SchoolError, "message" | "type"> & {
  type: SchoolErrorType.SCHOOL_NOT_FOUND;
};

export type SchoolAlreadyExistsError = Pick<SchoolError, "message" | "type"> & {
  type: SchoolErrorType.SCHOOL_ALREADY_EXISTS;
};

export const SchoolErrorHttpStatus = {
  [SchoolErrorType.SCHOOL_NOT_FOUND]: 404,
  [SchoolErrorType.SCHOOL_ALREADY_EXISTS]: 409,
};

export function isSchoolError(error: any): error is SchoolError {
  return (
    typeof error === "object" &&
    error !== null &&
    typeof error.message === "string" &&
    typeof error.type === "string" &&
    Object.values(SchoolErrorType).includes(error.type as SchoolErrorType)
  );
}
