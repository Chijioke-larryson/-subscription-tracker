const errorMiddleware =( err, req, res, next) => {
    try{
        let error = {...err};

        error.message =err.message;
        console.error(err);

        if (err.name === 'CastError') {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }
        //mongoose duplicate key
        if (err.code === 500000) {
            const message = 'Duplicate field value entered ';
            error = new Error(message);
            error.statusCode = 400;
        }
        //mongoose validation error
        if(err.name === 'ValidationError') {
            const message =  Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }
        res.status(error.statusCode || 500).json({success: false, error: error.message || 'Sever Error'})

    }catch (error) {
        next(error);
    }

};
export default errorMiddleware;