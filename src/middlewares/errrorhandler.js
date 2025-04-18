export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Interval server error";
    res.status(statusCode).json({
        status: false,
        message,
        data: null,
        error: err.stack,
    })
};
