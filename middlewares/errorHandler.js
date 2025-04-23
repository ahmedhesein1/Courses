import { Error as MongooseError } from "mongoose";

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = 500;
  let message = "Server Error";

  if (err instanceof MongooseError.CastError) {
    statusCode = 404;
    message = "Resource not found";
  } else if (err instanceof MongooseError.ValidationError) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  } else if (err.errors?.length > 0) {
    statusCode = 400;
    message = err.errors.map((e) => e.msg).join(", ");
  } else if (err.message.includes("not found")) {
    statusCode = 404;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
