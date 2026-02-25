import { Router } from 'express';
import { crearVenta, eliminarVenta, listarVentas } from '../controllers/ventasController.js';

const router = Router();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler(listarVentas));
router.post('/', asyncHandler(crearVenta));
router.delete('/:id', asyncHandler(eliminarVenta));

export default router;
