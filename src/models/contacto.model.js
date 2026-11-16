const { pool } = require('../config/database');

async function create(contact) {
  const { rows } = await pool.query(
    `INSERT INTO contactos (nombre, correo, telefono, asunto, mensaje)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, nombre, correo, asunto, estado, fecha_creacion AS "createdAt"`,
    [contact.nombre, contact.correo, contact.telefono || null, contact.asunto, contact.mensaje]
  );
  return rows[0];
}

module.exports = { create };
