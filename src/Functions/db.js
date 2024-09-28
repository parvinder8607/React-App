// db.js
import { openDB } from 'idb';

const DB_NAME = 'CartDB';
const STORE_NAME = 'cart';

export const initDB = async () => {
    const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        },
    });
    return db;
};

export const addItemToDB = async (item) => {
    const db = await initDB();
    await db.put(STORE_NAME, item);
};

export const getCartFromDB = async () => {
    const db = await initDB();
    return await db.getAll(STORE_NAME);
};

export const clearCartFromDB = async () => {
    const db = await initDB();
    await db.clear(STORE_NAME);
};

export const removeItemFromDB = async (id) => {
    const db = await initDB();
    await db.delete(STORE_NAME, id);
};
