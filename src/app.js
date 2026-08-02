import express from "express";
import morgan from "morgan";
import appointmentRoutes from "./routes/appointments.routes.js";
import prescriptionRoutes from "./routes/prescription.routes.js";
import globalErrorHandler from "./controllers/errorController.js";
import mongoose from "mongoose";
import AppError from "./utils/appError.js";
import { env } from "./config/env.js";
const app = express();
if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const PORT = env.PORT || 5000;
const DB_URI = env.MONGODB_URI;
app.use(express.json());
app.use("/api/appointments", appointmentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Database Connected Successfully !");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect DB", error);
  });
