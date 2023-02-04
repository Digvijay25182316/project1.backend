const ErrorHandler = require("../utils/errorhandler.js");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || " internal server error";

  //Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resourse not found . Inavalid: ${err.path}`;
    err = new ErrorHandler(message, 404);
  }

  //Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `User ${Object.keys(err.keyValue)} already exist`;
    err = new ErrorHandler(message, 404);
  }

  //Wrong JWT error
  if (err.name === "JsonWebToken") {
    const message = `Json Web Token is invalid try again`;
    err = new ErrorHandler(message, 404);
  }

  //JWT expire
  if (err.name === "TokenExpireError") {
    const message = `Json Web Token is expired,try again`;
    err = new ErrorHandler(message, 404);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
