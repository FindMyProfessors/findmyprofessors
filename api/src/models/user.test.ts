import { isUserError, UserErrorType, UserError } from "./users";

describe("isUserError", () => {
  it("should return true for a valid UserError", () => {
    const error: UserError = {
      message: "User not found",
      type: UserErrorType.USER_NOT_FOUND,
    };
    expect(isUserError(error)).toBe(true);
  });

  it("should return false for an error with an invalid type", () => {
    const error = {
      message: "User not found",
      type: "INVALID_TYPE",
    };
    expect(isUserError(error)).toBe(false);
  });

  it("should return false for an error with a missing message", () => {
    const error = {
      type: UserErrorType.USER_NOT_FOUND,
    };
    expect(isUserError(error)).toBe(false);
  });

  it("should return false for an error with a missing type", () => {
    const error = {
      message: "User not found",
    };
    expect(isUserError(error)).toBe(false);
  });

  it("should return false for a non-object error", () => {
    const error = "User not found";
    expect(isUserError(error)).toBe(false);
  });

  it("should return false for a null error", () => {
    const error = null;
    expect(isUserError(error)).toBe(false);
  });
});
