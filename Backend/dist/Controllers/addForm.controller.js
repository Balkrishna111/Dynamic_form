"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFormController = void 0;
const addFormController = async (req, res) => {
    try {
        const { addForm } = require("../Repositories/formRepo");
        const formData = req.body;
        const result = await addForm(formData);
        res.status(201).json({
            message: "Form added successfully",
            result: result,
        });
    }
    catch (err) {
        console.log("Error in addFormController:", err);
        return;
    }
};
exports.addFormController = addFormController;
//# sourceMappingURL=addForm.controller.js.map