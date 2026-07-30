import {
  createPrescription,
  getOnePrescription,
} from "../services/prescriptions.service.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// create
export const createPrescriptionCtrl = catchAsync(async (req, res, next) => {
  const data = req.body;
  const newPrescription = await createPrescription(data);
  res.status(201).json({
    success: true,
    data: newPrescription,
  });
});
// get one
export const getOnePrescriptionCtrl = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const prescription = await getOnePrescription(id);
  if (!prescription) {
    return next(new AppError("Prescription with this id is not found", 404));
  }
  res.status(200).json({
    success: true,
    data: prescription,
  });
});
