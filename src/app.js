const express = require('express');
const cors = require('cors');

const doctorRoutes = require('./routes/doctor.routes');
const citaRoutes = require('./routes/cita.routes');
const contactoRoutes = require('./routes/contacto.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    project: 'MediCitas API',
    status: 'ok'
  });
});

app.use('/api', doctorRoutes);
app.use('/api', citaRoutes);
app.use('/api', contactoRoutes);

app.use(errorHandler);

module.exports = app;
