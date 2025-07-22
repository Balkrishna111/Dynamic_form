import { Project } from "@prisma/client";

export interface IProjectRepo {
  getAllProjects(): Promise<Project[]>;
  getProjectById(id: string): Promise<Project | null>;
  addProject(projectData: Project): Promise<Project>;
  deleteProject(id: string): Promise<Project>;
  updateProject(projectData: Project): Promise<Project>;
}
