import { Response, Request, RequestHandler } from "express";
import {
  addForm,
  getForm,
  deleteForm,
  updateForm,
} from "../Repositories/formRepo"; // Adjust the import path as necessary

export const getFormController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getForm();
    if (!result) {
      res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({
      message: "Form retrieved successfully",
      result: result,
    });
  } catch (error) {
    console.error("Error in getFormController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addFormController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const formData = req.body;
    const result = await addForm(formData);
    res.status(201).json({
      message: "Form added successfully",
      result: result,
    });
  } catch (err) {
    console.log("Error in addFormController:", err);
    res.status(500).json({
      message: "error in addFormController",
      error: err,
    });
  }
};

export const updateFormController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const formData = req.body;
    const result = await updateForm(id, formData);
    res.status(200).json({
      message: "Form updated successfully",
      result: result,
    });
  } catch (err) {
    console.log("Error in updateFormController:", err);
    res.status(500).json({
      message: "error in updateFormController",
      error: err,
    });
  }
};

export const deleteFormController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { elementId } = req.params;
    console.log("delete id: ", elementId);
    const result = await deleteForm(elementId);
    res.status(201).json({
      message: "Form added successfully",
      result: result,
    });
  } catch (err) {
    console.log("Error in deleteFormController:", err);
    res.status(500).json({
      message: "error in deleteFormController",
      error: err,
    });
  }
};
