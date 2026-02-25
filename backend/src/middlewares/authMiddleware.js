import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no enviado.' });
  }

  const token = authHeader.replace('Bearer ', '');
  const secret = process.env.AUTH_JWT_SECRET || 'byestef-secret-dev';

  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};
