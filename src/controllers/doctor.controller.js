const DoctorModel = require('../models/doctor.model');

async function getEspecialidades(req, res, next) {
  try {
    const especialidades = await DoctorModel.getEspecialidades();
    res.json(especialidades);
  } catch (error) {
    next(error);
  }
}

async function getDoctores(req, res, next) {
  try {
    const { especialidad } = req.query;
    const doctores = await DoctorModel.getAll(especialidad);
    res.json(doctores);
  } catch (error) {
    next(error);
  }
}

async function getDoctorById(req, res, next) {
  try {
    const doctor = await DoctorModel.getById(Number(req.params.id));

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor no encontrado.' });
    }

    res.json(doctor);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getEspecialidades,
  getDoctores,
  getDoctorById
};
