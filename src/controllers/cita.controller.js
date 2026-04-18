const CitaModel = require('../models/cita.model');

async function getCitas(req, res, next) {
  try {
    const citas = await CitaModel.getAll();
    res.json(citas);
  } catch (error) {
    next(error);
  }
}

async function getCitaById(req, res, next) {
  try {
    const cita = await CitaModel.getById(Number(req.params.id));

    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada.' });
    }

    res.json(cita);
  } catch (error) {
    next(error);
  }
}

async function createCita(req, res, next) {
  try {
    const cita = await CitaModel.create(req.body);
    res.status(201).json(cita);
  } catch (error) {
    next(error);
  }
}

async function updateCita(req, res, next) {
  try {
    const { estado } = req.body;
    const cita = await CitaModel.updateStatus(Number(req.params.id), estado);

    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada.' });
    }

    res.json(cita);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCitas,
  getCitaById,
  createCita,
  updateCita
};
