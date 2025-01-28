export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;

    // Send error response with appropriate status code and error message
    res.status(statusCode).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack, // Show stack trace only in development mode
    });
  };
  