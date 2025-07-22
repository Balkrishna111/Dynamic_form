import express, { Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "Config/prismaClient";
import formRoutes from "./Routes/form.route"; // Adjust the import path as necessary
import projectRoutes from "./Routes/project.route"; // Adjust the import path as necessary
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000", "https://your-production-frontend.com"],
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + Prisma + MongoDB!");
});
app.use("/form", formRoutes);
app.use("/project", projectRoutes);

app.post("/api/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
