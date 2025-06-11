import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import urlRoutes from "./routes.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/", urlRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
