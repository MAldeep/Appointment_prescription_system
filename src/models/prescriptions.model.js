import mongoose from "mongoose";
const medicineSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      required: [true, "Medicine name is required"],
      trim: true,
    },
    dosage: {
      type: String,
      required: [true, "Dosage is required"],
    },
    durationDays: {
      type: Number,
      required: [true, "Duration in days is required"],
      min: [1, "Duration must be at least 1 day"],
    },
  },
  { _id: false },
);
const prescriptionSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      ref: "Patient",
      required: [true, "Patient Id is required"],
    },
    doctorId: {
      type: String,
      ref: "Doctor",
      required: [true, "Doctor Id is required"],
    },
    diagnosis: {
      type: String,
      required: [true, "Diagnosis Is Required"],
    },
    medicines: {
      type: [medicineSchema],
      validate: [
        (val) => val.lenght > 0,
        "Prescription must contain at least one medicine",
      ],
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
