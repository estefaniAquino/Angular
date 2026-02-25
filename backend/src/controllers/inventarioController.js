import {
  createProducto,
  deleteProducto,
  getAllProductos,
  getProductoById,
  updateProducto,
} from '../services/inventarioService.js';
import { calcularCostos } from '../utils/costCalculator.js';

/**
 * Lista todos los productos.
 */
export const listarProductos = async (_req, res) => {
  const productos = await getAllProductos();
  res.json(productos);
};

/**
 * Obtiene un producto por ID.
 */
export const obtenerProducto = async (req, res) => {
  const producto = await getProductoById(req.params.id);

  if (!producto) {
    return res.status(404).json({ message: 'Producto no encontrado.' });
  }

  return res.json(producto);
};

/**
 * Crea un producto nuevo calculando costos automáticamente.
 */
export const crearProducto = async (req, res) => {
  const body = req.body;
  const costos = calcularCostos(body);

  const producto = await createProducto({
    nombre: body.nombre,
    categoria: body.categoria,
    unidad: body.unidad,
    cantidad: Number(body.cantidad || 0),
    costoIngredientes: Number(body.costoIngredientes || 0),
    costoEmpaque: Number(body.costoEmpaque || 0),
    costoManoObra: Number(body.costoManoObra || 0),
    margenGanancia: Number(body.margenGanancia || 0),
    ...costos,
    notas: body.notas || '',
  });

  return res.status(201).json(producto);
};

/**
 * Actualiza producto y recalcula costos.
 */
export const actualizarProducto = async (req, res) => {
  const id = req.params.id;
  const existente = await getProductoById(id);

  if (!existente) {
    return res.status(404).json({ message: 'Producto no encontrado.' });
  }

  const body = req.body;
  const costos = calcularCostos(body);

  const producto = await updateProducto(id, {
    nombre: body.nombre,
    categoria: body.categoria,
    unidad: body.unidad,
    cantidad: Number(body.cantidad || 0),
    costoIngredientes: Number(body.costoIngredientes || 0),
    costoEmpaque: Number(body.costoEmpaque || 0),
    costoManoObra: Number(body.costoManoObra || 0),
    margenGanancia: Number(body.margenGanancia || 0),
    ...costos,
    notas: body.notas || '',
  });

  return res.json(producto);
};

/**
 * Elimina un producto.
 */
export const eliminarProducto = async (req, res) => {
  const id = req.params.id;
  const existente = await getProductoById(id);

  if (!existente) {
    return res.status(404).json({ message: 'Producto no encontrado.' });
  }

  await deleteProducto(id);

  return res.status(204).send();
};
