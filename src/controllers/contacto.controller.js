const ContactoModel = require('../models/contacto.model');

async function createContacto(req, res, next) {
  try {
    const contacto = await ContactoModel.create(req.body);
    res.status(201).json(contacto);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createContacto
};
