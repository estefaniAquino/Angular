import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import ingredientesRoutes from './routes/ingredientesRoutes.js';
import recetasRoutes from './routes/recetasRoutes.js';
import ventasRoutes from './routes/ventasRoutes.js';
import reportesRoutes from './routes/reportesRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', proyecto: 'ByEstef' });
});

app.use('/api/ingredientes', ingredientesRoutes);
app.use('/api/recetas', recetasRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/reportes', reportesRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    message: 'Ocurrió un error interno en el servidor.',
    detail: error.message,
  });
});

app.listen(port, () => {
  console.log(`API ByEstef escuchando en http://localhost:${port}`);
});
