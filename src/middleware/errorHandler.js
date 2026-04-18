function errorHandler(error, req, res, next) {
  console.error(error);

  res.status(500).json({
    message: 'Ocurrió un error interno en el servidor.'
  });
}

module.exports = errorHandler;
