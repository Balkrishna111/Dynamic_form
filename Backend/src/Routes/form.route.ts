import express from "express";
import { FormController } from "../Controllers/addForm.controller";
const router = express.Router();

const controller = new FormController();

router.get("/", controller.getForm);
router.post("/addForm", controller.addForm);
router.put("/updateForm/:id", controller.updateForm);
router.delete("/formElement/:id", controller.deleteForm);

export default router;
