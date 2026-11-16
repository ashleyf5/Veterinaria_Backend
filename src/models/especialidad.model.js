const { pool } = require('../config/database');

async function findAll() {
  const { rows } = await pool.query(
    `SELECT id, nombre, descripcion, imagen_url AS "imageUrl"
     FROM especialidades WHERE estado = TRUE ORDER BY id`
  );
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query(
    `SELECT id, nombre, descripcion, imagen_url AS "imageUrl"
     FROM especialidades WHERE id = $1 AND estado = TRUE`,
    [id]
  );
  return rows[0] || null;
}

module.exports = { findAll, findById };
