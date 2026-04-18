const express = require('express');
const contactoController = require('../controllers/contacto.controller');
const validateContacto = require('../middleware/validateContacto');

const router = express.Router();

router.post('/contactos', validateContacto, contactoController.createContacto);

module.exports = router;
