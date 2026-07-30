import Prescription from "../models/prescriptions.model.js";

// create
export const createPrescription = async (data) => {
  const newPrescription = await Prescription.create(data);
  return newPrescription;
};

// get one
export const getOnePrescription = async (id) => {
  const prescription = await Prescription.findById(id);
  return prescription;
};
