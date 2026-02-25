import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const validEmail = process.env.AUTH_EMAIL || 'admin@byestef.com';
  const validPassword = process.env.AUTH_PASSWORD || 'ByEstef123!';

  if (email !== validEmail || password !== validPassword) {
    return res.status(401).json({ message: 'Credenciales inválidas.' });
  }

  const secret = process.env.AUTH_JWT_SECRET || 'byestef-secret-dev';
  const token = jwt.sign({ email, role: 'admin' }, secret, { expiresIn: '12h' });

  return res.json({ token, user: { email, nombre: 'ByEstef Admin' } });
};
