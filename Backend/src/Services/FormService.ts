import { Form } from "@prisma/client";
import { IFormService } from "Interfaces/IFormService";
import { FormRepoClass } from "Repositories/formRepo";
import { IFormRepo } from "Repositories/Interrfaces/IFormRepo";

export class FormService implements IFormService {
  private repo: IFormRepo = new FormRepoClass();
  async getForms() {
    return await this.repo.getAllForms();
  }
  async addForm(formData: Form) {
    return await this.repo.addForm(formData);
  }
  async deleteForm(id: string) {
    return await this.repo.deleteForm(id);
  }
  async updateForm(formData: Form) {
    return await this.repo.updateForm(formData);
  }
}
