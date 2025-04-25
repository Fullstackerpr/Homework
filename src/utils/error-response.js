export const catchError = (res, code , err) => {
    return res.status(500).json({
        statusCode:code,
        error: err
    });
}