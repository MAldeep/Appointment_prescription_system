import mongoose from "mongoose";

const appointmentScehma = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: [true, "Patient Id is required"],
    },
    doctorId: {
      type: String,
      required: [true, "Doctor Id is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Cancelled", "Confirmed", "Completed"],
    },
  },
  {
    timestamps: true,
  },
);
const Appointment = mongoose.model("Appointment", appointmentScehma);
export default Appointment;
