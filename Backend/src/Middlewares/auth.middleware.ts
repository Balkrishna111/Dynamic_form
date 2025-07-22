import { Request, Response, NextFunction } from "express";
import { IAuthMiddleware } from "./Interfaces/IAuthMiddleware";

export class AuthMiddlewareClass implements IAuthMiddleware {
  authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader =
        req.headers["authorization"] ?? req.headers["Authorization"];

      return next();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error occurred while authorizing user." });
    }
  };
}
