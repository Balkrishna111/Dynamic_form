"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const prismaClient_1 = __importDefault(require("Config/prismaClient"));
const form_route_1 = __importDefault(require("./Routes/form.route")); // Adjust the import path as necessary
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello from Express + Prisma + MongoDB!");
});
app.use("/form", form_route_1.default);
app.post("/api/users", async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await prismaClient_1.default.user.create({
            data: { name, email },
        });
        res.status(201).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map