const pool = require('../config/db');

async function getAll() {
  const [rows] = await pool.query(`
    SELECT
      c.id_cita,
      c.fecha,
      TIME_FORMAT(c.hora, '%H:%i') AS hora,
      c.motivo,
      c.estado,
      p.id_paciente,
      p.nombre AS paciente_nombre,
      p.correo AS paciente_correo,
      p.telefono AS paciente_telefono,
      d.id_doctor,
      d.nombre AS doctor_nombre,
      d.apellido AS doctor_apellido,
      e.nombre AS especialidad_nombre
    FROM citas c
    INNER JOIN pacientes p ON c.id_paciente = p.id_paciente
    INNER JOIN doctores d ON c.id_doctor = d.id_doctor
    INNER JOIN especialidades e ON d.id_especialidad = e.id_especialidad
    ORDER BY c.fecha ASC, c.hora ASC
  `);

  return rows;
}

async function getById(id) {
  const [rows] = await pool.query(`
    SELECT
      c.id_cita,
      c.fecha,
      TIME_FORMAT(c.hora, '%H:%i') AS hora,
      c.motivo,
      c.estado,
      p.id_paciente,
      p.nombre AS paciente_nombre,
      p.correo AS paciente_correo,
      p.telefono AS paciente_telefono,
      d.id_doctor,
      d.nombre AS doctor_nombre,
      d.apellido AS doctor_apellido,
      e.nombre AS especialidad_nombre
    FROM citas c
    INNER JOIN pacientes p ON c.id_paciente = p.id_paciente
    INNER JOIN doctores d ON c.id_doctor = d.id_doctor
    INNER JOIN especialidades e ON d.id_especialidad = e.id_especialidad
    WHERE c.id_cita = ?
  `, [id]);

  return rows[0] || null;
}

async function findPatientByEmail(correo) {
  const [rows] = await pool.query(
    'SELECT id_paciente FROM pacientes WHERE correo = ? LIMIT 1',
    [correo]
  );
  return rows[0] || null;
}

async function createPatient(payload) {
  const { nombrePaciente, correoPaciente, telefonoPaciente } = payload;
  const [result] = await pool.query(
    `
      INSERT INTO pacientes (nombre, correo, telefono)
      VALUES (?, ?, ?)
    `,
    [nombrePaciente, correoPaciente, telefonoPaciente]
  );

  return result.insertId;
}

async function create(payload) {
  const {
    nombrePaciente,
    correoPaciente,
    telefonoPaciente,
    idDoctor,
    fecha,
    hora,
    motivo
  } = payload;

  let patient = await findPatientByEmail(correoPaciente);
  let idPaciente = patient?.id_paciente;

  if (!idPaciente) {
    idPaciente = await createPatient(payload);
  }

  const [result] = await pool.query(
    `
      INSERT INTO citas (id_paciente, id_doctor, fecha, hora, motivo, estado)
      VALUES (?, ?, ?, ?, ?, 'Pendiente')
    `,
    [idPaciente, idDoctor, fecha, hora, motivo]
  );

  return getById(result.insertId);
}

async function updateStatus(id, estado) {
  await pool.query(
    'UPDATE citas SET estado = ? WHERE id_cita = ?',
    [estado, id]
  );

  return getById(id);
}

module.exports = {
  getAll,
  getById,
  create,
  updateStatus
};
