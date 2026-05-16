// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // CastError means an invalid MongoDB ObjectId was passed
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(404).json({ message: "Resource not found" });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandler;
