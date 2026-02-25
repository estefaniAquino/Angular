import { getVentas } from '../services/ventasService.js';

const inRange = (fechaIso, periodo) => {
  const now = new Date();
  const fecha = new Date(fechaIso);
  const diffMs = now.getTime() - fecha.getTime();
  const diffDias = diffMs / (1000 * 60 * 60 * 24);

  if (periodo === 'dia') return diffDias <= 1;
  if (periodo === 'semana') return diffDias <= 7;
  if (periodo === 'quincena') return diffDias <= 15;
  return diffDias <= 30;
};

export const reporteVentas = async (req, res) => {
  const periodo = req.query.periodo || 'mes';
  const ventas = (await getVentas()).filter((v) => inRange(v.fecha, periodo));

  const totalVentas = ventas.reduce((acc, v) => acc + Number(v.totalVenta || 0), 0);
  const totalTransacciones = ventas.length;

  const ranking = {};
  for (const venta of ventas) {
    for (const item of venta.items || []) {
      if (!ranking[item.recetaNombre]) ranking[item.recetaNombre] = 0;
      ranking[item.recetaNombre] += Number(item.cantidad || 0);
    }
  }

  const productoMasVendido = Object.entries(ranking)
    .sort((a, b) => b[1] - a[1])
    .map(([nombre, cantidad]) => ({ nombre, cantidad }))[0] || null;

  res.json({
    periodo,
    totalVentas: Number(totalVentas.toFixed(2)),
    totalTransacciones,
    productoMasVendido,
    ventas,
  });
};
