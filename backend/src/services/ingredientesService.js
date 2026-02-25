import initFirebase from '../config/firebase.js';

const db = initFirebase();
const collection = db.collection('ingredientes-byestef');

export const getIngredientes = async () => {
  const snapshot = await collection.orderBy('nombre').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getIngredienteById = async (id) => {
  const doc = await collection.doc(id).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

export const createIngrediente = async (payload) => {
  const now = new Date().toISOString();
  const ref = await collection.add({ ...payload, createdAt: now, updatedAt: now });
  return getIngredienteById(ref.id);
};

export const updateIngrediente = async (id, payload) => {
  await collection.doc(id).update({ ...payload, updatedAt: new Date().toISOString() });
  return getIngredienteById(id);
};

export const deleteIngrediente = async (id) => {
  await collection.doc(id).delete();
};
