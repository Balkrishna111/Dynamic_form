import prisma from "Config/prismaClient";
import { Project } from "@prisma/client";
import { IProjectRepo } from "./Interrfaces/IProjectRepo";

export class ProjectRepoClass implements IProjectRepo {
  async getAllProjects() {
    return await prisma.project.findMany();
  }
  async getProjectById(id: string) {
    return await prisma.project.findFirst({
      where: { id: id },
      include: { formElements: true },
    });
  }

  async addProject(projectData: Project) {
    return await prisma.project.create({ data: projectData });
  }

  async deleteProject(id: string) {
    return await prisma.project.delete({ where: { id: id } });
  }

  async updateProject(projectData: Project) {
    const { id: _, ...dataWithoutId } = projectData;
    return await prisma.project.update({
      where: { id: projectData.id as string },
      data: dataWithoutId,
    });
  }
}
