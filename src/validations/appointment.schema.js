import z from "zod";

export const createAppointmentSchema = z.object({
  body: z.object({
    patientId: z.string({ required_error: "Patient Id Is Required" }),
    doctorId: z.string({ required_error: "Doctor Id Is Required" }),
    status: z
      .enum(["Pending", "Cancelled", "Confirmed", "Completed"])
      .default("Pending"),
  }),
});
export const updateAppointmentSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Appointment ID param is required" }),
  }),
  body: z.object({
    patientId: z.string({ required_error: "Patient Id Is Required" }),
    doctorId: z.string({ required_error: "Doctor Id Is Required" }),
    status: z.enum(["Pending", "Cancelled", "Confirmed", "Completed"]),
  }),
});
export const getAppointmentSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10)),
    status: z
      .enum(["Pending", "Cancelled", "Confirmed", "Completed"])
      .optional(),
  }),
});
