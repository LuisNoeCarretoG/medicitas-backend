function validateContacto(req, res, next) {
  const { nombre, correo, asunto, mensaje } = req.body;

  if (!nombre || !correo || !asunto || !mensaje) {
    return res.status(400).json({ message: 'Todos los campos del contacto son obligatorios.' });
  }

  next();
}

module.exports = validateContacto;
