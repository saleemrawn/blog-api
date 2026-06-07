const getErrorStatusCode = (err) => {
  if (err.code === "P2025") return 404;
  if (err.code === "P2002") return 409;

  return Number(err.statusCode) || err.status || 500;
};

const getErrorMessage = (err) => {
  if (err.code === "P2025") {
    const field = err.meta?.model ?? err.meta?.modelName ?? "Record";
    return `${field} not found`;
  }

  if (err.code === "P2002") {
    const field = err.meta?.model ?? err.meta?.modelName ?? "field";
    return `A record for that ${field} already exists`;
  }

  return err.message || "Oops! Something went wrong.";
};

const errorController = (err, req, res, next) => {
  const statusCode = getErrorStatusCode(err);
  const errorMessage = getErrorMessage(err);

  res.status(statusCode).json({ success: false, code: err.code, message: errorMessage });
};

export default errorController;
