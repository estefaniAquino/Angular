import { Router } from 'express';
import { crearReceta, actualizarReceta, eliminarReceta, listarRecetas } from '../controllers/recetasController.js';

const router = Router();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler(listarRecetas));
router.post('/', asyncHandler(crearReceta));
router.put('/:id', asyncHandler(actualizarReceta));
router.delete('/:id', asyncHandler(eliminarReceta));

export default router;
