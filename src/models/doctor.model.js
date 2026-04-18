const pool = require('../config/db');

async function getAll(especialidad) {
  let query = `
    SELECT
      d.id_doctor,
      d.nombre,
      d.apellido,
      d.correo,
      d.telefono,
      d.consultorio,
      d.horario,
      d.foto,
      d.experiencia_anios,
      e.id_especialidad,
      e.nombre AS especialidad_nombre,
      e.descripcion AS especialidad_descripcion
    FROM doctores d
    INNER JOIN especialidades e ON d.id_especialidad = e.id_especialidad
  `;
  const params = [];

  if (especialidad && especialidad !== 'todas') {
    query += ' WHERE LOWER(e.nombre) = LOWER(?) ';
    params.push(especialidad);
  }

  query += ' ORDER BY d.nombre ASC';
  const [rows] = await pool.query(query, params);
  return rows;
}

async function getById(id) {
  const [rows] = await pool.query(
    `
    SELECT
      d.id_doctor,
      d.nombre,
      d.apellido,
      d.correo,
      d.telefono,
      d.consultorio,
      d.horario,
      d.foto,
      d.experiencia_anios,
      e.id_especialidad,
      e.nombre AS especialidad_nombre,
      e.descripcion AS especialidad_descripcion
    FROM doctores d
    INNER JOIN especialidades e ON d.id_especialidad = e.id_especialidad
    WHERE d.id_doctor = ?
    `,
    [id]
  );

  return rows[0] || null;
}

async function getEspecialidades() {
  const [rows] = await pool.query(
    'SELECT id_especialidad, nombre, descripcion FROM especialidades ORDER BY nombre ASC'
  );
  return rows;
}

module.exports = {
  getAll,
  getById,
  getEspecialidades
};
