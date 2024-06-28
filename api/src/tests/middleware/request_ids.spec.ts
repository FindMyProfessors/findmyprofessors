import requestIdMiddleware from "../../middleware/request_id";
import { Request, Response, NextFunction } from "express";

describe("requestIdMiddleware", () => {
  it("should assign a UUID to req.request_id", () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    requestIdMiddleware()(req, res, next);

    expect(req.request_id).toBeDefined();
    expect(typeof req.request_id).toBe("string");
    expect(req.request_id).toHaveLength(36); // UUID length
    expect(next).toHaveBeenCalled();
  });
});