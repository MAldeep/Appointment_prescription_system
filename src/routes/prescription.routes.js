import express from "express";
import { validate } from "../middlewares/validate.js";
import { createPrescriptionSchema } from "../validations/prescription.schema.js";
import {
  createPrescriptionCtrl,
  getOnePrescriptionCtrl,
} from "../controllers/prescriptions.controller.js";
const router = express.Router();
router.post("/", validate(createPrescriptionSchema), createPrescriptionCtrl);
router.get("/:id", getOnePrescriptionCtrl);
export default router;
