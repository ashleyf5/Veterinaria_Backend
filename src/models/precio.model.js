const { pool } = require('../config/database');

async function findAll() {
  const { rows } = await pool.query(
    `SELECT s.id AS "servicioId", s.nombre AS "serviceName",
            p.precio AS price, COALESCE(p.moneda, 'BOB') AS currency,
            p.descripcion_adicional AS note
     FROM servicios s
     LEFT JOIN precios p ON p.servicio_id = s.id AND p.vigente = TRUE
     WHERE s.estado = TRUE
     ORDER BY s.nombre`
  );
  return rows;
}

async function findByServiceId(serviceId) {
  const { rows } = await pool.query(
    `SELECT s.id AS "servicioId", s.nombre AS "serviceName",
            p.precio AS price, COALESCE(p.moneda, 'BOB') AS currency,
            p.descripcion_adicional AS note
     FROM servicios s
     LEFT JOIN precios p ON p.servicio_id = s.id AND p.vigente = TRUE
     WHERE s.id = $1 AND s.estado = TRUE`,
    [serviceId]
  );
  return rows[0] || null;
}

module.exports = { findAll, findByServiceId };
