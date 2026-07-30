import AppError from "../utils/appError.js";

export const validate = (schema) => (req, res, next) => {
  const parseResult = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });
  if (!parseResult.success) {
    const errorMessage = parseResult.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(" | ");
    return next(new AppError(errorMessage, 400));
  }
  req.body = parseResult.data.body;
  next();
};
