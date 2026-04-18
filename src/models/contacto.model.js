const pool = require('../config/db');

async function create(payload) {
  const { nombre, correo, asunto, mensaje } = payload;

  const [result] = await pool.query(
    `
      INSERT INTO contactos (nombre, correo, asunto, mensaje)
      VALUES (?, ?, ?, ?)
    `,
    [nombre, correo, asunto, mensaje]
  );

  const [rows] = await pool.query(
    'SELECT * FROM contactos WHERE id_contacto = ?',
    [result.insertId]
  );

  return rows[0];
}

module.exports = {
  create
};
