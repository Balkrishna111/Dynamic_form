import express from "express";
import {
  addFormController,
  getFormController,
  deleteFormController,
  updateFormController,
} from "../Controllers/addForm.controller";
const router = express.Router();

router.get("/", getFormController);
router.post("/addForm", addFormController);
router.put("/updateForm/:id", updateFormController);
router.delete("/formElement/:elementId", deleteFormController);

export default router;
