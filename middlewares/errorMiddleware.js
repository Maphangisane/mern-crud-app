// Generic error handling middleware
const errorMiddleware = (err, req, res, next) => {
	console.error(err.stack); // Log the error stack for debugging

	// Determine the status code and message based on the error type
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Default to 500 if status code is not set
	res.status(statusCode).json({
		success: false,
		message: err.message || 'Internal Server Error',
	});
};

module.exports = errorMiddleware;
