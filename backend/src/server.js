import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import inventarioRoutes from './routes/inventarioRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta de salud rápida para validar que el servidor esté arriba.
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// API principal del CRUD.
app.use('/api/inventario', inventarioRoutes);

// Manejador de errores global.
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    message: 'Ocurrió un error interno en el servidor.',
    detail: error.message,
  });
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
