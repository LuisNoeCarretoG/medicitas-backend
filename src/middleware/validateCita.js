function validateCita(req, res, next) {
  const {
    nombrePaciente,
    correoPaciente,
    telefonoPaciente,
    idDoctor,
    fecha,
    hora,
    motivo
  } = req.body;

  if (!nombrePaciente || !correoPaciente || !telefonoPaciente || !idDoctor || !fecha || !hora || !motivo) {
    return res.status(400).json({ message: 'Todos los campos de la cita son obligatorios.' });
  }

  next();
}

module.exports = validateCita;
