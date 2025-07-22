import { User } from "@prisma/client";

export interface IAuthService {
  loginService(email: string, password: string): Promise<User | null>;
  registerService(userData: User): Promise<User>;
}
