const model = require('../models/servicio.model');
const { success, failure } = require('../utils/responses');

async function list(req, res) {
  return success(res, await model.findAll());
}

async function get(req, res) {
  const item = await model.findById(Number(req.params.id));
  return item ? success(res, item) : failure(res, 'Servicio no encontrado.', 404);
}

module.exports = { list, get };
