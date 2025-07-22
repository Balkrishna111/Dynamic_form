import { NextFunction, Request, RequestHandler, Response } from "express";

export interface IAuthMiddleware {
  authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Promise<void>;
}
