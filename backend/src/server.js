import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { inventoryCollection } from './firebase.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

const sanitizeNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
};

const normalizeItem = (payload = {}) => {
  const quantity = sanitizeNumber(payload.quantity);
  const unitCost = sanitizeNumber(payload.unitCost);
  const salePrice = sanitizeNumber(payload.salePrice);

  return {
    nombre: String(payload.nombre || '').trim(),
    categoria: String(payload.categoria || '').trim(),
    unidadMedida: String(payload.unidadMedida || '').trim() || 'unidad',
    quantity,
    unitCost,
    salePrice,
    totalCost: Number((quantity * unitCost).toFixed(2)),
    potentialRevenue: Number((quantity * salePrice).toFixed(2)),
    updatedAt: new Date().toISOString()
  };
};

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'inventario-reposteria-api' });
});

app.get('/api/inventory', async (_req, res) => {
  const snapshot = await inventoryCollection.orderBy('updatedAt', 'desc').get();
  const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.json(items);
});

app.post('/api/inventory', async (req, res) => {
  const item = normalizeItem(req.body);

  if (!item.nombre) {
    return res.status(400).json({ message: 'El nombre es obligatorio.' });
  }

  const doc = await inventoryCollection.add({
    ...item,
    createdAt: new Date().toISOString()
  });

  return res.status(201).json({ id: doc.id, ...item });
});

app.put('/api/inventory/:id', async (req, res) => {
  const id = req.params.id;
  const item = normalizeItem(req.body);

  if (!item.nombre) {
    return res.status(400).json({ message: 'El nombre es obligatorio.' });
  }

  await inventoryCollection.doc(id).set(item, { merge: true });
  return res.json({ id, ...item });
});

app.delete('/api/inventory/:id', async (req, res) => {
  const id = req.params.id;
  await inventoryCollection.doc(id).delete();
  return res.status(204).send();
});

app.get('/api/inventory/cost-summary', async (_req, res) => {
  const snapshot = await inventoryCollection.get();
  const items = snapshot.docs.map((doc) => doc.data());

  const totalInversion = items.reduce((acc, item) => acc + sanitizeNumber(item.totalCost), 0);
  const totalVentaPotencial = items.reduce((acc, item) => acc + sanitizeNumber(item.potentialRevenue), 0);
  const utilidadEstimada = totalVentaPotencial - totalInversion;

  res.json({
    totalInversion: Number(totalInversion.toFixed(2)),
    totalVentaPotencial: Number(totalVentaPotencial.toFixed(2)),
    utilidadEstimada: Number(utilidadEstimada.toFixed(2))
  });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Error interno del servidor', detail: error.message });
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
