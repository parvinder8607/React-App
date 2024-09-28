// CartContext.js
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {
    addItemToDB,
    getCartFromDB,
    clearCartFromDB,
    removeItemFromDB,
} from '../Functions/db';

// Create Cart Context
const CartContext = createContext();

// Initial State
const initialState = {
    items: [],
};

// Reducer function
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return { ...state, items: [...state.items, action.payload] };
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
        case 'CLEAR_CART':
            return { ...state, items: [] };
            case 'SET_ITEMS':
            return { ...state, items: action.payload };
        default:
            return state;
    }
};

// Cart Provider component
export const CartProvider = ({ children }) => {
    const [cartItem, dispatch] = useReducer(cartReducer, initialState);

    const addItem = async (item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
        await addItemToDB(item);
    };

    const removeItem = async (item) => {
        dispatch({ type: 'REMOVE_ITEM', payload: item });
        await removeItemFromDB(item.id);
    };

    const clearCart = async () => {
        dispatch({ type: 'CLEAR_CART' });
        await clearCartFromDB();
    };

    const loadCart = async () => {
        const cartItems = await getCartFromDB();
        dispatch({ type: 'SET_ITEMS', payload: cartItems });
    };

    useEffect(() => {
        loadCart(); 
    }, []);

    return (
        <CartContext.Provider value={{ cartItem, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the Cart Context
export const useCart = () => {
    return useContext(CartContext);
};
