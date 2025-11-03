import express from "express";
import morgan from "morgan";
import cors from "cors";
import "./db.js";

import router from "./routes/index.js";
import { setupSwagger } from "./swagger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { seedDB } from "./seed.js";

const app = express();
const PORT = process.env.PORT ?? 3001;
const isProduction = process.env.ENVIRONMENT === "production";
const SEED_SECRET = process.env.SEED_SECRET;

app.use(cors());
app.use(express.json());

if (!isProduction) {
  app.use(morgan("dev"));
  setupSwagger(app, PORT);
}

app.use("/api", router);

app.post("/seed", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || authHeader !== `Bearer ${SEED_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    await seedDB();
    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seeding error:", error);
    res.status(500).json({ error: "Seeding failed: " + error.message });
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    "\x1b[33m%s\x1b[0m",
    `Server running on \x1b[36m http://localhost:${PORT}`
  );
  if (!isProduction)
    console.log(
      "\x1b[33m%s\x1b[0m",
      `Swagger API docs available at \x1b[36m http://localhost:${PORT}/api-docs`
    );
});
