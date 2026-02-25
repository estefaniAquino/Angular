/**
 * Calculadora de costos para recetas de pastelería (ByEstef).
 * Basada en la lógica típica de costo por ingrediente + costos indirectos.
 */
export const calcularReceta = ({ ingredientesDetalle, costoEmpaque = 0, costoManoObra = 0, gastosFijos = 0, margenGanancia = 0, porciones = 1, }) => {
  const subtotalIngredientes = ingredientesDetalle.reduce(
    (acc, item) => acc + Number(item.costoUsado || 0),
    0,
  );

  const costoTotal = subtotalIngredientes + Number(costoEmpaque) + Number(costoManoObra) + Number(gastosFijos);
  const precioSugerido = costoTotal * (1 + Number(margenGanancia) / 100);
  const costoPorPorcion = porciones > 0 ? costoTotal / porciones : 0;
  const precioPorPorcion = porciones > 0 ? precioSugerido / porciones : 0;

  return {
    subtotalIngredientes: Number(subtotalIngredientes.toFixed(2)),
    costoTotal: Number(costoTotal.toFixed(2)),
    precioSugerido: Number(precioSugerido.toFixed(2)),
    costoPorPorcion: Number(costoPorPorcion.toFixed(2)),
    precioPorPorcion: Number(precioPorPorcion.toFixed(2)),
  };
};
