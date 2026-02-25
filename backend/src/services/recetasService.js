import initFirebase from '../config/firebase.js';

const db = initFirebase();
const collection = db.collection('recetas-byestef');

export const getRecetas = async () => {
  const snapshot = await collection.orderBy('createdAt', 'desc').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getRecetaById = async (id) => {
  const doc = await collection.doc(id).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

export const createReceta = async (payload) => {
  const now = new Date().toISOString();
  const ref = await collection.add({ ...payload, createdAt: now, updatedAt: now });
  return getRecetaById(ref.id);
};

export const updateReceta = async (id, payload) => {
  await collection.doc(id).update({ ...payload, updatedAt: new Date().toISOString() });
  return getRecetaById(id);
};

export const deleteReceta = async (id) => {
  await collection.doc(id).delete();
};
