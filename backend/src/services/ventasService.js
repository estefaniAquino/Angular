import initFirebase from '../config/firebase.js';

const db = initFirebase();
const collection = db.collection('ventas-byestef');

export const getVentas = async () => {
  const snapshot = await collection.orderBy('fecha', 'desc').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createVenta = async (payload) => {
  const now = new Date().toISOString();
  const ref = await collection.add({ ...payload, createdAt: now, updatedAt: now });
  const doc = await ref.get();
  return { id: doc.id, ...doc.data() };
};

export const deleteVenta = async (id) => {
  await collection.doc(id).delete();
};
