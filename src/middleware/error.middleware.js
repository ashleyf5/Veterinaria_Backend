function notFound(req, res) {
  res.status(404).json({ success: false, error: 'Recurso no encontrado.' });
}

function errorHandler(error, req, res, next) {
  console.error('Error de API:', error.message);
  if (res.headersSent) return next(error);

  if (error.type === 'entity.too.large') {
    return res.status(413).json({ success: false, error: 'La solicitud es demasiado grande.' });
  }
  if (error.status === 503) {
    return res.status(503).json({
      success: false,
      error: req.path.startsWith('/api/chatbot')
        ? 'El asistente virtual no está disponible en este momento. Puedes comunicarte directamente con nuestra veterinaria.'
        : 'El servicio no está disponible en este momento.'
    });
  }
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, error: 'El cuerpo de la solicitud no es JSON válido.' });
  }

  return res.status(500).json({ success: false, error: 'Ocurrió un error interno. Inténtalo más tarde.' });
}

module.exports = { notFound, errorHandler };
