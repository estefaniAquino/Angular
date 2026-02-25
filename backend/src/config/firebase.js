import admin from 'firebase-admin';
import { readFileSync } from 'node:fs';

/**
 * Inicializa Firebase Admin leyendo un archivo de credenciales.
 * Esto permite que Node.js escriba y lea en Firestore de forma segura.
 */
const initFirebase = () => {
  if (admin.apps.length > 0) {
    return admin.firestore();
  }

  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (!serviceAccountPath) {
    throw new Error(
      'Debes definir FIREBASE_SERVICE_ACCOUNT_PATH en el archivo .env del backend.',
    );
  }

  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  return admin.firestore();
};

export default initFirebase;
