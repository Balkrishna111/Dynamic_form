import { Form } from "@prisma/client";

export interface IFormRepo {
  getAllForms(): Promise<Form[]>;
  addForm(formData: Form): Promise<Form>;
  deleteForm(id: string): Promise<Form>;
  updateForm(formData: Form): Promise<Form>;
}
