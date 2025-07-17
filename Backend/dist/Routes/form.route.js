"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addForm_controller_1 = require("../Controllers/addForm.controller");
const router = express_1.default.Router();
router.post("/addForm", addForm_controller_1.addFormController);
exports.default = router;
//# sourceMappingURL=form.route.js.map