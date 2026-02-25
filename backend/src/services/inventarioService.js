import initFirebase from '../config/firebase.js';

const db = initFirebase();
const collection = db.collection('inventario-reposteria');

/**
 * Obtiene todos los productos del inventario.
 */
export const getAllProductos = async () => {
  const snapshot = await collection.orderBy('createdAt', 'desc').get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * Obtiene un producto por su ID.
 */
export const getProductoById = async (id) => {
  const doc = await collection.doc(id).get();

  if (!doc.exists) {
    return null;
  }

  return { id: doc.id, ...doc.data() };
};

/**
 * Crea un producto en Firestore.
 */
export const createProducto = async (payload) => {
  const now = new Date().toISOString();
  const ref = await collection.add({
    ...payload,
    createdAt: now,
    updatedAt: now,
  });

  return getProductoById(ref.id);
};

/**
 * Actualiza un producto existente.
 */
export const updateProducto = async (id, payload) => {
  await collection.doc(id).update({
    ...payload,
    updatedAt: new Date().toISOString(),
  });

  return getProductoById(id);
};

/**
 * Elimina un producto por ID.
 */
export const deleteProducto = async (id) => {
  await collection.doc(id).delete();
};
