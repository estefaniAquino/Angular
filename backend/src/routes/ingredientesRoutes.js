import { Router } from 'express';
import { actualizarIngrediente, crearIngrediente, eliminarIngrediente, listarIngredientes } from '../controllers/ingredientesController.js';

const router = Router();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler(listarIngredientes));
router.post('/', asyncHandler(crearIngrediente));
router.put('/:id', asyncHandler(actualizarIngrediente));
router.delete('/:id', asyncHandler(eliminarIngrediente));

export default router;
