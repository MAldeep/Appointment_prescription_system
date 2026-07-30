import Appointment from "../models/appointments.model.js";

// get
export const getAllAppointments = async (queryParams) => {
  const { status, patientId, doctorId, page = 1, limit = 10 } = queryParams;
  const filter = {};
  if (status) filter.status = status;
  if (patientId) filter.patientId = patientId;
  if (doctorId) filter.doctorId = doctorId;

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const skip = (pageNum - 1) * limitNum;
  const appointments = await Appointment.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  const totalAppointments = await Appointment.countDocuments(filter);
  return {
    appointments,
    pagination: {
      total: totalAppointments,
      page,
      limit,
      totalPages: Math.ceil(totalAppointments / limit),
    },
  };
};
// get one
export const getOneAppointment = async (id) => {
  const appointment = await Appointment.findById(id);
  return appointment;
};
// create
export const createAppointment = async (data) => {
  const newAppointment = await Appointment.create(data);
  return newAppointment;
};
// patch
export const updateAppointment = async (id, data) => {
  const updatedAppointment = await Appointment.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return updatedAppointment;
};
// delete
export const deleteAppointment = async (id) => {
  const deletedAppointment = await Appointment.findByIdAndDelete(id);
  return deletedAppointment;
};
