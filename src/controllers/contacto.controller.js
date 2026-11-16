const model = require('../models/contacto.model');
const { success } = require('../utils/responses');

async function create(req, res) {
  const saved = await model.create(req.body);
  return success(res, saved, 201);
}

module.exports = { create };
