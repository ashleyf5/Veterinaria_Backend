const model = require('../models/precio.model');
const { success, failure } = require('../utils/responses');

async function list(req, res) {
  return success(res, await model.findAll());
}

async function getByService(req, res) {
  const item = await model.findByServiceId(Number(req.params.servicioId));
  return item ? success(res, item) : failure(res, 'Servicio no encontrado.', 404);
}

module.exports = { list, getByService };
