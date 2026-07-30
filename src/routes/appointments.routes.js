import express from "express";
import { validate } from "../middlewares/validate.js";
import {
  createAppointmentSchema,
  getAppointmentSchema,
  updateAppointmentSchema,
} from "../validations/appointment.schema.js";
import {
  createAppointmentCtrl,
  deleteAppointmentCtrl,
  getAllAppointmentsCtrl,
  getOneAppointmentCtrl,
  updateAppointmentCtrl,
} from "../controllers/appointments.controller.js";

const router = express.Router();
router
  .route("/")
  .get(validate(getAppointmentSchema), getAllAppointmentsCtrl)
  .post(validate(createAppointmentSchema), createAppointmentCtrl);
router
  .route("/:id")
  .get(getOneAppointmentCtrl)
  .put(validate(updateAppointmentSchema), updateAppointmentCtrl)
  .delete(deleteAppointmentCtrl);
