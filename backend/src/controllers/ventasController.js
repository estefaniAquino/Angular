import { deleteVenta, getVentas, createVenta } from '../services/ventasService.js';
import { getRecetaById } from '../services/recetasService.js';

export const listarVentas = async (_req, res) => {
  res.json(await getVentas());
};

export const crearVenta = async (req, res) => {
  const body = req.body;
  const items = [];

  for (const item of body.items || []) {
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

export const eliminarVenta = async (req, res) => {
  await deleteVenta(req.params.id);
  res.status(204).send();
};
