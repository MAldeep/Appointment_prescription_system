import AppError from "../utils/appError.js";

const handleCastErorrDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
  const value = err.keyValue
    ? Object.values(err.keyValue)[0]
    : err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let error = Object.assign(err);
  error.message = err.message;
  if (error.name === "CastError") error = handleCastErorrDB(error);
  if (error.code === 11000) error = handleDuplicateFieldDB(error);
  if (error.name === "ValidationError") error = handleValidationErrorDB(error);
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
export default globalErrorHandler;
