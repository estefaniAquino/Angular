import { createVenta, deleteVenta, getVentaById, getVentas, updateVenta } from '../services/ventasService.js';
import { getRecetaById } from '../services/recetasService.js';

const construirItemsVenta = async (itemsBody = []) => {
  const items = [];

  for (const item of itemsBody) {
    const receta = await getRecetaById(item.recetaId);
    if (!receta) continue;

    const cantidad = Number(item.cantidad || 1);
    const precioUnitario = Number(item.precioUnitario || receta.precioPorPorcion || receta.precioSugerido || 0);
    const totalLinea = cantidad * precioUnitario;

    items.push({
      recetaId: receta.id,
      recetaNombre: receta.nombre,
      cantidad,
      precioUnitario: Number(precioUnitario.toFixed(2)),
      totalLinea: Number(totalLinea.toFixed(2)),
    });
  }

  return items;
};

export const listarVentas = async (_req, res) => {
  res.json(await getVentas());
};

export const crearVenta = async (req, res) => {
  const body = req.body;
  const items = await construirItemsVenta(body.items || []);
  const totalVenta = items.reduce((acc, it) => acc + it.totalLinea, 0);

  const venta = await createVenta({
    fecha: body.fecha || new Date().toISOString(),
    canal: body.canal || 'Mostrador',
    items,
    totalVenta: Number(totalVenta.toFixed(2)),
    notas: body.notas || '',
  });

  res.status(201).json(venta);
};

export const actualizarVenta = async (req, res) => {
  const existente = await getVentaById(req.params.id);
  if (!existente) return res.status(404).json({ message: 'Venta no encontrada.' });

  const body = req.body;
  const items = await construirItemsVenta(body.items || []);
  const totalVenta = items.reduce((acc, it) => acc + it.totalLinea, 0);

  const venta = await updateVenta(req.params.id, {
    fecha: body.fecha || existente.fecha,
    canal: body.canal || 'Mostrador',
    items,
    totalVenta: Number(totalVenta.toFixed(2)),
    notas: body.notas || '',
  });

  return res.json(venta);
};

export const eliminarVenta = async (req, res) => {
  const existente = await getVentaById(req.params.id);
  if (!existente) return res.status(404).json({ message: 'Venta no encontrada.' });

  await deleteVenta(req.params.id);
  res.status(204).send();
};
