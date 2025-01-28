// Function to send a successful response
// It takes the response object (res), a message, and data to be sent back as a JSON response
export const successResponse = (res, message, data) => {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  };
  
// Function to send an error response
// It takes the response object (res), a message, and an optional status code (defaults to 500)
export const errorResponse = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
  