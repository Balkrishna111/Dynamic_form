import { Project } from "@prisma/client";
import { Response, Request, RequestHandler } from "express";
import { IProjectService } from "Interfaces/IProjectService";
import { ProjectService } from "Services/ProjectService";

export class ProjectController {
  private service: IProjectService = new ProjectService();
  getProject: RequestHandler = async (req: Request, res: Response) => {
    try {
      const allProjectData = await this.service.getProjects();
      res.status(200).json({
        message: "Projects retrieved successfully",
        result: allProjectData,
      });
    } catch (err) {
      res.status(500).json({ error: err as string });
    }
  };

  getProjectById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const foundProject = await this.service.getSingleProject(id);
      res.status(201).json(foundProject);
    } catch (err) {
      res.status(500).json({
        message: "error",
        error: err as string,
      });
    }
  };

  addProject: RequestHandler = async (req: Request, res: Response) => {
    const projectData = req.body;
    try {
      const addedProject = await this.service.addProject(
        projectData as Project
      );
      res.status(201).json(addedProject);
    } catch (err) {
      res.status(500).json(err as string);
    }
  };

  deleteProject: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedItem = await this.service.deleteProject(id as string);
      res.status(200).json({ deletedItem });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  updateProject: RequestHandler = async (req: Request, res: Response) => {
    const projectData = req.body;
    try {
      const updatedProject = await this.service.updateProject(
        projectData as Project
      );
      res.status(200).json(updatedProject);
    } catch (err) {
      res.status(500).json(err as string);
    }
  };
}
