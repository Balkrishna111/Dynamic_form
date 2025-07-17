import prisma from "Config/prismaClient";

export function addForm(formData: any) {
  return prisma.form.create({
    data: formData,
  });
}
export async function getForm() {
  const result = await prisma.form.findMany();
  // return JSON.parse(JSON.stringify(result));
  return result;
}

export async function deleteForm(id: string) {
  const result = await prisma.form.delete({ where: { id: id } });
  // return JSON.parse(JSON.stringify(result));
  return result;
}

export async function updateForm(id: string, formData: any) {
  const { id: _, ...dataWithoutId } = formData;
  const result = await prisma.form.update({
    where: { id: id },
    data: dataWithoutId,
  });
  return result;
}
