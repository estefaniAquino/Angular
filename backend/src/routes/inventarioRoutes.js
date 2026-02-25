import { Router } from 'express';
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  listarProductos,
  obtenerProducto,
} from '../controllers/inventarioController.js';

const router = Router();

// Wrapper para manejar errores async sin repetir try/catch en cada controlador.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/', asyncHandler(listarProductos));
router.get('/:id', asyncHandler(obtenerProducto));
router.post('/', asyncHandler(crearProducto));
router.put('/:id', asyncHandler(actualizarProducto));
router.delete('/:id', asyncHandler(eliminarProducto));

export default router;
