import { User } from "@prisma/client";
import { IAuthService } from "Interfaces/IAuthService";
import { AuthRepoClass } from "Repositories/AuthRepo";
import { IAuthRepo } from "Repositories/Interrfaces/IAuthRepo";

export class AuthService implements IAuthService {
  private repo: IAuthRepo = new AuthRepoClass();
  async loginService(email: string) {
    return await this.repo.loginRepo(email);
  }
  async registerService(userData: User) {
    return await this.repo.registerRepo(userData);
  }
}
