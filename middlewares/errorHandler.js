export const errorHandler = (err, req, res, next) => {
  console.error("\x1b[31m%s\x1b[0m", err.stack || err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || "Something went wrong",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
