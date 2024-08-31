import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase'; // Usa el `db` exportado desde firebase.js

/**
 * Obtiene todos los productos desde Firestore.
 */
export const getProducts = async () => {
  try {
    const productsCollection = collection(db, 'products');
    const snapshot = await getDocs(productsCollection);
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};

/**
 * Guarda un pedido en Firestore.
 * @param {Object} order - Objeto que representa el pedido.
 */
export const saveOrder = async (order) => {
  try {
    const ordersCollection = collection(db, 'orders');
    const docRef = await addDoc(ordersCollection, order);
    return docRef.id;
  } catch (error) {
    console.error('Error saving order:', error);
    throw new Error('Error saving order');
  }
};

/**
 * Actualiza un producto en Firestore.
 * @param {string} id - ID del producto.
 * @param {Object} updates - Actualizaciones para el producto.
 */
export const updateProduct = async (id, updates) => {
  try {
    const productDoc = doc(db, 'products', id);
    await updateDoc(productDoc, updates);
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Error updating product');
  }
};

/**
 * Elimina un producto de Firestore.
 * @param {string} id - ID del producto.
 */
export const deleteProduct = async (id) => {
  try {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Error deleting product');
  }
};