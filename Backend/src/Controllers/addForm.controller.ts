import { Form } from "@prisma/client";
import { Response, Request, RequestHandler } from "express";
import { IFormService } from "Interfaces/IFormService";
import { FormService } from "Services/FormService";

export class FormController {
  private service: IFormService = new FormService();
  getForm: RequestHandler = async (req: Request, res: Response) => {
    try {
      const allFormData = await this.service.getForms();
      res.status(200).json({
        message: "Form retrieved successfully",
        result: allFormData,
      });
    } catch (err) {
      res.status(500).json({ error: err as string });
    }
  };

  addForm: RequestHandler = async (req: Request, res: Response) => {
    const formData = req.body;
    try {
      const addedForm = await this.service.addForm(formData as Form);
      res.status(201).json(addedForm);
    } catch (err) {
      res.status(500).json(err as string);
    }
  };

  deleteForm: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedItem = await this.service.deleteForm(id as string);
      res.status(200).json({ deletedItem });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  updateForm: RequestHandler = async (req: Request, res: Response) => {
    const formData = req.body;
    try {
      const updatedForm = await this.service.updateForm(formData as Form);
      res.status(200).json(updatedForm);
    } catch (err) {
      res.status(500).json(err as string);
    }
  };
}
