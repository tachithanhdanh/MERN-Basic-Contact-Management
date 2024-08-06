const STATUS_CODE = require("../constants");

const errorHandler = (err, req, res, next) => {
  // if status code not found then it is a server error
  const statusCode = Number(res.statusCode ? res.statusCode : STATUS_CODE.SERVER_ERROR);
  let title;
  const message = err.message;
  const stackTrace = process.env.NODE_ENV === "production" ? null : err.stack;
  // console.log(statusCode);
  // console.log(STATUS_CODE.NOT_FOUND);
  switch (statusCode) {
    case STATUS_CODE.VALIDATION_ERROR:
      title = "Validation Error";
      break;
    case STATUS_CODE.SERVER_ERROR:
      title = "Server Error";
      break;
    case STATUS_CODE.NOT_FOUND:
      title = "Not Found";
      break;
    case STATUS_CODE.NOT_ALLOWED:
      title = "Method Not Allowed";
      break;
    case STATUS_CODE.NOT_ACCEPTABLE:
      title = "Not Acceptable";
      break;
    case STATUS_CODE.FORBIDDEN:
      title = "Forbidden";
      break;
    case STATUS_CODE.UNAUTHORIZED:
      title = "Unauthorized";
      break;
    default:
      title = "No error! That's good";
      break;
  }
  res.json({
    title,
    message,
    stackTrace,
  });
};

module.exports = errorHandler;
