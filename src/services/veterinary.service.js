const { pool } = require('../config/database');

async function getAssistantContext() {
  const [clinic, services, specialties, prices] = await Promise.all([
    pool.query(
      `SELECT nombre, descripcion, direccion, telefono, correo, whatsapp,
              horario_atencion AS "horarioAtencion"
       FROM veterinaria ORDER BY id LIMIT 1`
    ),
    pool.query('SELECT nombre, descripcion FROM servicios WHERE estado = TRUE ORDER BY nombre'),
    pool.query('SELECT nombre, descripcion FROM especialidades WHERE estado = TRUE ORDER BY nombre'),
    pool.query(
      `SELECT s.nombre, p.precio, p.moneda, p.descripcion_adicional AS nota
       FROM precios p JOIN servicios s ON s.id = p.servicio_id
       WHERE p.vigente = TRUE AND s.estado = TRUE ORDER BY s.nombre`
    )
  ]);
  return {
    veterinaria: clinic.rows[0] || null,
    servicios: services.rows,
    especialidades: specialties.rows,
    precios: prices.rows
  };
}

module.exports = { getAssistantContext };
