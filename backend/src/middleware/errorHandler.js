/**
 * Centralized production error handling middleware.
 * Sanitizes stack traces and returns clean, structured errors to clients.
 */
export const errorHandler = (err, req, res, next) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const statusCode = err.status || err.statusCode || 500;

  // Log error details internally for observability
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, {
    message: err.message,
    status: statusCode,
    stack: isProduction ? undefined : err.stack
  });

  return res.status(statusCode).json({
    error: err.message || 'An internal server error occurred.',
    code: err.code || 'INTERNAL_ERROR',
    ...(isProduction ? {} : { stack: err.stack })
  });
};
