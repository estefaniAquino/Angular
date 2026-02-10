/**
 * Calcula costo total y precio de venta sugerido para un producto.
 *
 * @param {object} data Datos capturados desde el formulario.
 * @returns {{costoTotal: number, precioVenta: number}} Resultado de costos.
 */
export const calcularCostos = (data) => {
  // Convertimos a número para evitar errores si llegan como texto.
  const costoIngredientes = Number(data.costoIngredientes || 0);
  const costoEmpaque = Number(data.costoEmpaque || 0);
  const costoManoObra = Number(data.costoManoObra || 0);
  const margenGanancia = Number(data.margenGanancia || 0);

  // Costo base de producir el producto.
  const costoTotal = costoIngredientes + costoEmpaque + costoManoObra;

  // Aplicamos margen (ejemplo: 40% => multiplicar por 1.4).
  const precioVenta = costoTotal * (1 + margenGanancia / 100);

  return {
    costoTotal: Number(costoTotal.toFixed(2)),
    precioVenta: Number(precioVenta.toFixed(2)),
  };
};
