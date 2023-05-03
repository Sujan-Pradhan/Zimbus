const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  console.log("Error handler middleware called with error:", err);

  err.statusCode = err.statusCode || 500;
  //   err.message = err.message || "Internal Server Error";
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    return res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    // Wrong Mongoose Object Id Error
    if (err.name == "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // Handling mongoose validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Handling the monggoose duplicate error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    // Handling wrong jwt error
    if (err.name === `JsonWenTokenError`) {
      const message = `Json Web Token is Invalid. Try Again!!`;
      error = new ErrorHandler(message, 400);
    }

    // Handling expired jwt error
    if (err.name === `TokenExpiredError`) {
      const message = `Json Web Token is Expired. Try Again!!`;
      error = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
