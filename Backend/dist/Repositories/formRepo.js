"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addForm = addForm;
const prismaClient_1 = __importDefault(require("Config/prismaClient"));
function addForm(formData) {
    return prismaClient_1.default.form.create({
        data: formData,
    });
}
//# sourceMappingURL=formRepo.js.map