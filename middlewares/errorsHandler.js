function errorsHandler(err, req, res, next) {
    console.error(err.stack);

    res.status(500).json({
        error: 'Internal Server Error',
        message: 'Qualcosa è andato storto'
    })
}

module.exports = errorsHandler;
