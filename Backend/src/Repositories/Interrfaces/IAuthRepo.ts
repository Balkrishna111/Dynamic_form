import { User } from "@prisma/client";

export interface IAuthRepo {
  loginRepo(email: string): Promise<User | null>;
  registerRepo(userData: User): Promise<User>;
}
