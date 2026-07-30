import z from "zod";

const medicineSchema = z.object({
  medicineName: z
    .string({ required_error: "Medicine name is required" })
    .trim()
    .min(2, "At least 2 chars"),
  dosage: z.string({ required_error: "Dosage is required" }).trim(),
  durationDays: z
    .number({ required_error: "Duration in days is required" })
    .int("Duration must be a whole number")
    .positive("Duration must be at least 1 day"),
});

export const createPrescriptionSchema = z.object({
  body: z.object({
    patientId: z.string({ required_error: "Patient ID is required" }),
    doctorId: z.string({ required_error: "Doctor ID is required" }),
    diagnosis: z
      .string({ required_error: "Diagnosis is required" })
      .min(5, "At least 5 chars"),
    medicines: z
      .array(medicineSchema)
      .min(1, "Prescription must contain at least one medicine"),
    notes: z.string().optional(),
  }),
});
