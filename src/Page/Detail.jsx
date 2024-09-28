import React from 'react';
import { useLocation } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import styles from './Detail.module.css';

export default function Detail() {
    const { addItem } = useCart();
    const location = useLocation();
    const { anime } = location.state || {};

    if (!anime) {
        return <p className={styles.noData}>No product data available.</p>;
    }

    const addToCart = () => {
        addItem(anime);
    };

    return (
        <div className={styles.detailContainer}>
            <h1 className={styles.pageTitle}>Product Details</h1>
            <div className={styles.productCard}>
                <div className={styles.imageContainer}>
                    <img className={styles.productImage} src={anime.image} alt={anime.title} />
                </div>
                <div className={styles.productInfo}>
                    <h2 className={styles.productTitle}>{anime.title}</h2>
                    <p className={styles.productPrice}>${anime.price}</p>
                    <p className={styles.productDescription}>{anime.description}</p>
                    <div className={styles.actionArea}>
                        <button className={styles.addToCartButton} onClick={addToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}