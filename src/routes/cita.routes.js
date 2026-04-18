const express = require('express');
const citaController = require('../controllers/cita.controller');
const validateCita = require('../middleware/validateCita');

const router = express.Router();

router.get('/citas', citaController.getCitas);
router.get('/citas/:id', citaController.getCitaById);
router.post('/citas', validateCita, citaController.createCita);
router.put('/citas/:id', citaController.updateCita);

module.exports = router;
