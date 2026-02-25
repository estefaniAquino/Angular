import { Router } from 'express';
import { reporteVentas } from '../controllers/reportesController.js';

const router = Router();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/ventas', asyncHandler(reporteVentas));

export default router;
