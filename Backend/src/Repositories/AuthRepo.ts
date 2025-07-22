import prisma from "Config/prismaClient";
import { User } from "@prisma/client";
import { IAuthRepo } from "./Interrfaces/IAuthRepo";

export class AuthRepoClass implements IAuthRepo {
  async loginRepo(email: string) {
    return await prisma.user.findFirst({ where: { email: email } });
  }

  async registerRepo(userData: User) {
    return await prisma.user.create({ data: userData });
  }
}
