const model = require('../models/veterinaria.model');
const { success, failure } = require('../utils/responses');

async function get(req, res) {
  const item = await model.find();
  return item ? success(res, item) : failure(res, 'Aún no hay información institucional registrada.', 404);
}

module.exports = { get };
