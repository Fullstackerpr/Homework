export const errorHandle = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        status: 'error',
        message,
        data: null, 
        error: err.stack,
    });
};