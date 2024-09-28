import React from 'react';
import { Link } from "react-router-dom";
import Search from "./Search";
import { useCart } from "../Context/CartContext";
import styles from './Header.module.css';

export default function Header() {
    const { cartItem } = useCart();

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                <h1>E-commerce</h1>
            </Link>
            
            <nav className={styles.nav}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/latest">Latest</Link></li>
                    <li><Link to="/categories">Categories</Link></li>
                    
                    <li>
                        <Link to="/cart">
                            Cart
                            {cartItem.items.length > 0 && (
                                <span className={styles.badge}>{cartItem.items.length}</span>
                            )}
                        </Link>
                    </li>
                </ul>
            </nav>
            
            <Search />
        </header>
    );
}