import express from "express";
import { ProjectController } from "Controllers/project.controller";
const router = express.Router();

const controller = new ProjectController();

router.get("/", controller.getProject);
router.get("/:id", controller.getProjectById);
router.post("/add", controller.addProject);
router.put("/update/:id", controller.updateProject);

export default router;
