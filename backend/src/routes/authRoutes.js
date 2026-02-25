import { Router } from 'express';
import { login } from '../controllers/authController.js';

const router = Router();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.post('/login', asyncHandler(login));

export default router;
