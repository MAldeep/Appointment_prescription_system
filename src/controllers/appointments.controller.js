import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getOneAppointment,
  updateAppointment,
} from "../services/appointments.service.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// get all
export const getAllAppointmentsCtrl = catchAsync(async (req, res, next) => {
  const appointments = await getAllAppointments(req.query);
  if (!appointments || appointments.length === 0) {
    return next(new AppError("appointments not found", 404));
  }
  res.status(200).json({
    success: true,
    data: appointments,
  });
});
// get one
export const getOneAppointmentCtrl = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await getOneAppointment(id);
  if (!appointment) {
    return next(new AppError("Appointment not found", 404));
  }
  res.status(200).json({
    success: true,
    data: appointment,
  });
});
// create
export const createAppointmentCtrl = catchAsync(async (req, res, next) => {
  const data = req.body;
  const newAppointment = await createAppointment(data);
  res.status(201).json({
    success: true,
    data: newAppointment,
  });
});
// update
export const updateAppointmentCtrl = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const updatedAppointment = await updateAppointment(id, data);
  if (!updatedAppointment) {
    return next(new AppError("Appointment with this id is not found", 404));
  }
  res.status(200).json({
    success: true,
    data: updatedAppointment,
  });
});
// delete
export const deleteAppointmentCtrl = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedAppointment = await deleteAppointment(id);
  if (!deletedAppointment) {
    return next(new AppError("Appointment with this id is not found", 404));
  }
  res.status(200).json({
    success: true,
    data: deletedAppointment,
  });
});
