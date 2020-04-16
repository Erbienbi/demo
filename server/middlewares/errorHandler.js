function errorHandler(err, req, res, next) {
    console.log('Error:', err.name)
    let status, error = ''

    if (err.name === 'SequelizeValidationError') {
        status = 400
        error = err.errors[0]
    } else if (err.name === 'SequelizeDatabaseError') {
        status = 400
        error = { message: 'Please enter the right information!' }
    } else if (err.name === 'JsonWebTokenError') {
        status = 400
        error = { message: 'You need to login first!' }
    } else {
        if (err.status) status = err.status
        else status = 500
        error = err
    }
    res.status(status).json(error)
}

module.exports = errorHandler