import { Project } from "@prisma/client";
import { IProjectService } from "Interfaces/IProjectService";
import { IProjectRepo } from "Repositories/Interrfaces/IProjectRepo";
import { ProjectRepoClass } from "Repositories/projectRepo";

export class ProjectService implements IProjectService {
  private repo: IProjectRepo = new ProjectRepoClass();
  async getProjects() {
    return await this.repo.getAllProjects();
  }
  async getSingleProject(id: string) {
    return await this.repo.getProjectById(id);
  }
  async addProject(formData: Project) {
    return await this.repo.addProject(formData);
  }
  async deleteProject(id: string) {
    return await this.repo.deleteProject(id);
  }
  async updateProject(formData: Project) {
    return await this.repo.updateProject(formData);
  }
}
