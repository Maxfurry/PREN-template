const {
  OK_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  REDIRECT_CODE
} = require('../../constants/');

const successResponse = (res, message, data, statusCode = OK_CODE) => res.status(statusCode).json({
    success: true,
    message,
    data
  }),

  failureResponse = (res, message, statusCode = NOT_FOUND_CODE) => res.status(statusCode).json({
    success: false,
    message
  }),

  serverFailure = (res, message = SERVER_ERROR_MESSAGE, statusCode = SERVER_ERROR_CODE) => {
    res.status(statusCode).json({
      success: false,
      message
    });
  },

  redirect = (res, url, statusCode = REDIRECT_CODE) => {
    res.redirect(statusCode, url);
  };

module.exports = {
  successResponse,
  failureResponse,
  serverFailure,
  redirect
};
