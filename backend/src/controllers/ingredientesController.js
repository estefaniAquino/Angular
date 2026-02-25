import { createIngrediente, deleteIngrediente, getIngredienteById, getIngredientes, updateIngrediente, } from '../services/ingredientesService.js';

export const listarIngredientes = async (_req, res) => {
  res.json(await getIngredientes());
};

export const crearIngrediente = async (req, res) => {
  const body = req.body;
  const ingrediente = await createIngrediente({
    nombre: body.nombre,
    unidadBase: body.unidadBase || 'g',
    costoUnidad: Number(body.costoUnidad || 0),
    stockActual: Number(body.stockActual || 0),
    notas: body.notas || '',
  });
  res.status(201).json(ingrediente);
};

export const actualizarIngrediente = async (req, res) => {
  const existente = await getIngredienteById(req.params.id);
  if (!existente) return res.status(404).json({ message: 'Ingrediente no encontrado.' });

  const body = req.body;
  const ingrediente = await updateIngrediente(req.params.id, {
    nombre: body.nombre,
    unidadBase: body.unidadBase || 'g',
    costoUnidad: Number(body.costoUnidad || 0),
    stockActual: Number(body.stockActual || 0),
    notas: body.notas || '',
  });
  return res.json(ingrediente);
};

export const eliminarIngrediente = async (req, res) => {
  const existente = await getIngredienteById(req.params.id);
  if (!existente) return res.status(404).json({ message: 'Ingrediente no encontrado.' });
  await deleteIngrediente(req.params.id);
  return res.status(204).send();
};
