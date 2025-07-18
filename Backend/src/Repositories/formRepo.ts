import prisma from "Config/prismaClient";
import { IFormRepo } from "./Interrfaces/IFormRepo";
import { Form } from "@prisma/client";

export class FormRepoClass implements IFormRepo {
  async getAllForms() {
    return await prisma.form.findMany();
  }

  async addForm(formData: Form) {
    return await prisma.form.create({ data: formData });
  }

  async deleteForm(id: string) {
    return await prisma.form.delete({ where: { id: id } });
  }

  async updateForm(formData: Form) {
    const { id: _, ...dataWithoutId } = formData;
    return await prisma.form.update({
      where: { id: formData.id as string },
      data: dataWithoutId,
    });
  }
}
