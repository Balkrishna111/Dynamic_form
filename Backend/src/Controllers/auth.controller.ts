import { Form } from "@prisma/client";
import { Response, Request, RequestHandler } from "express";
import { IAuthService } from "Interfaces/IAuthService";
import { AuthService } from "Services/AuthService";

export class AuthController {
  private service: IAuthService = new AuthService();
  login: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const allFormData = await this.service.loginService(
        email as string,
        password as string
      );
      res.status(200).json({
        message: "Form retrieved successfully",
        result: allFormData,
      });
    } catch (err) {
      res.status(500).json({ error: err as string });
    }
  };
}
