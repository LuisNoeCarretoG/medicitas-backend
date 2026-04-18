const express = require('express');
const doctorController = require('../controllers/doctor.controller');

const router = express.Router();

router.get('/especialidades', doctorController.getEspecialidades);
router.get('/doctores', doctorController.getDoctores);
router.get('/doctores/:id', doctorController.getDoctorById);

module.exports = router;
