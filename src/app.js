require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const { checkDatabase, pool } = require('./config/database');
const { notFound, errorHandler } = require('./middleware/error.middleware');

const app = express();
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:4200')
  .split(',')
  .map((origin) => origin.trim());

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '32kb' }));
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 150,
  standardHeaders: 'draft-7',
  legacyHeaders: false
}));

app.get('/api/health', async (req, res) => {
  try {
    await checkDatabase();
    res.json({ success: true, data: { api: 'ok', database: 'ok' } });
  } catch (error) {
    error.status = 503;
    throw error;
  }
});

app.use('/api/servicios', require('./routes/servicio.routes'));
app.use('/api/especialidades', require('./routes/especialidad.routes'));
app.use('/api/precios', require('./routes/precio.routes'));
app.use('/api/veterinaria', require('./routes/veterinaria.routes'));
app.use('/api/galeria', require('./routes/galeria.routes'));
app.use('/api/contactos', require('./routes/contacto.routes'));
app.use('/api/chatbot', require('./routes/chatbot.routes'));

app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT || 3000);
if (require.main === module) {
  app.listen(port, () => console.log(`API de veterinaria disponible en http://localhost:${port}`));
}

process.on('SIGINT', async () => {
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await pool.end();
  process.exit(0);
});

module.exports = app;
