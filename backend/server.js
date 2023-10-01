import express, { urlencoded } from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 5000;

import userRoutes from "./routes/userRoutes.js";

connectDB();

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Servr is ready");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
