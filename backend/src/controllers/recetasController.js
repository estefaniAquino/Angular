import { calcularReceta } from '../utils/recipeCalculator.js';
import { getIngredienteById } from '../services/ingredientesService.js';
import { createReceta, deleteReceta, getRecetaById, getRecetas, updateReceta } from '../services/recetasService.js';

const construirDetalleIngredientes = async (ingredientes = []) => {
  const detalle = [];

  for (const item of ingredientes) {
    const ingrediente = await getIngredienteById(item.ingredienteId);
    if (!ingrediente) continue;

    const cantidadUsada = Number(item.cantidadUsada || 0);
    const costoUsado = cantidadUsada * Number(ingrediente.costoUnidad || 0);

    detalle.push({
      ingredienteId: ingrediente.id,
      nombre: ingrediente.nombre,
      unidadBase: ingrediente.unidadBase,
      costoUnidad: Number(ingrediente.costoUnidad || 0),
      cantidadUsada,
      costoUsado: Number(costoUsado.toFixed(2)),
    });
  }

  return detalle;
};

export const listarRecetas = async (_req, res) => {
  res.json(await getRecetas());
};

export const crearReceta = async (req, res) => {
  const body = req.body;
  const ingredientesDetalle = await construirDetalleIngredientes(body.ingredientes);

  const calculo = calcularReceta({
    ingredientesDetalle,
    costoEmpaque: body.costoEmpaque,
    costoManoObra: body.costoManoObra,
    gastosFijos: body.gastosFijos,
    margenGanancia: body.margenGanancia,
    porciones: Number(body.porciones || 1),
  });

  const receta = await createReceta({
    nombre: body.nombre,
    categoria: body.categoria || 'General',
    porciones: Number(body.porciones || 1),
    costoEmpaque: Number(body.costoEmpaque || 0),
    costoManoObra: Number(body.costoManoObra || 0),
    gastosFijos: Number(body.gastosFijos || 0),
    margenGanancia: Number(body.margenGanancia || 0),
    ingredientesDetalle,
    ...calculo,
    notas: body.notas || '',
  });

  res.status(201).json(receta);
};

export const actualizarReceta = async (req, res) => {
  const existente = await getRecetaById(req.params.id);
  if (!existente) return res.status(404).json({ message: 'Receta no encontrada.' });

  const body = req.body;
  const ingredientesDetalle = await construirDetalleIngredientes(body.ingredientes);

  const calculo = calcularReceta({
    ingredientesDetalle,
    costoEmpaque: body.costoEmpaque,
    costoManoObra: body.costoManoObra,
    gastosFijos: body.gastosFijos,
    margenGanancia: body.margenGanancia,
    porciones: Number(body.porciones || 1),
  });

  const receta = await updateReceta(req.params.id, {
    nombre: body.nombre,
    categoria: body.categoria || 'General',
    porciones: Number(body.porciones || 1),
    costoEmpaque: Number(body.costoEmpaque || 0),
    costoManoObra: Number(body.costoManoObra || 0),
    gastosFijos: Number(body.gastosFijos || 0),
    margenGanancia: Number(body.margenGanancia || 0),
    ingredientesDetalle,
    ...calculo,
    notas: body.notas || '',
  });

  res.json(receta);
};

export const eliminarReceta = async (req, res) => {
  const existente = await getRecetaById(req.params.id);
  if (!existente) return res.status(404).json({ message: 'Receta no encontrada.' });
  await deleteReceta(req.params.id);
  res.status(204).send();
};
