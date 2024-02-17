const AppError = require(`./../util/appError`);

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    error: err,
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    //Operational : send message
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //Programming or unknown error dont leak details
    res.status(500).json({
      status: `error`,
      message: `Something went wrong`,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || `error`;

  if (process.env.NODE_ENV === 'development') {
    let error = { ...err };
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === `CastError`) error = handleCastError(error);
    sendErrorProd(error, res);
  }
};
