const { pool } = require('../config/database');

async function find() {
  const { rows } = await pool.query(
    `SELECT id, nombre, descripcion, historia, mision, vision, valores,
            direccion, telefono, correo, whatsapp,
            horario_atencion AS "horarioAtencion", mapa_url AS "mapaUrl"
     FROM veterinaria ORDER BY id LIMIT 1`
  );
  return rows[0] || null;
}

module.exports = { find };
