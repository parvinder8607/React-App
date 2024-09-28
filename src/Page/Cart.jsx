// CartComponent.js
import React from 'react';
import { useCart } from '../Context/CartContext';
import { useSearch } from '../Context/SearchContext';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';

const Cart = () => {
    const { searchTerm } = useSearch();
    const { cartItem, removeItem, clearCart } = useCart();

    const filterCart = cartItem.items.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalCost = cartItem.items.reduce((total, item) => total + item.price, 0);

    return (
        <div className={styles['cart-container']}>
            <h2 className={styles['cart-title']}>Shopping Cart</h2>
            {cartItem.items.length === 0 ? (
                <p className={styles['cart-empty']}>Your cart is empty.</p>
            ) : (
                <>
                    <ul className={styles['cart-list']}>
                        {filterCart.map((item) => (
                            <li key={item.id} className={styles['cart-item']}>
                                <img className={styles['cart-item-image']} src={item.image} alt={item.title} />
                                <div className={styles['cart-item-details']}>
                                    <span className={styles['cart-item-title']}>{item.title}</span>
                                    <span className={styles['cart-item-price']}>${item.price.toFixed(2)}</span>
                                </div>
                                <button className={styles['cart-item-remove']} onClick={() => removeItem(item)}>Remove</button>
                                <Link to={`/order-status/${item.id}`} className={styles['order-status-link']}>
                                    <button className={styles['order-status-button']}>Check Status</button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className={styles['cart-summary']}>
                        <span className={styles['cart-total']}>Total: ${totalCost.toFixed(2)}</span>
                        <button className={styles['cart-clear']} onClick={clearCart}>Clear Cart</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
