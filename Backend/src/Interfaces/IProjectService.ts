import { Project } from "@prisma/client";

export interface IProjectService {
  getProjects(): Promise<Project[]>;
  getSingleProject(id: string): Promise<Project | null>;
  addProject(ProjectData: Project): Promise<Project>;
  deleteProject(id: string): Promise<Project>;
  updateProject(ProjectData: Project): Promise<Project>;
}
