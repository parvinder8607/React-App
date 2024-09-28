import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import styles from './Card.module.css';


const Card = ({ anime }) => {
    const navigator = useNavigate();
    const { addItem } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleLink = () => {
        navigator('/detail', { state: { anime } });
    }

    const addCard = () => {

       
        addItem(anime);
        setIsAdded(true);
         // Reset after 2 seconds
    }
    
    return (
        <>
       
       
        <div className={styles.card}>
            <img 
                className={styles.image} 
                src={anime.image} 
                alt={anime.title} 
                onClick={handleLink}
            />
            <div className={styles.content}>
                <h2 className={styles.title}>{anime.title}</h2>
                <p className={styles.description}>
                    {anime.description.split('').slice(0,100).join('')}...
                </p>
                <p className={styles.price}>Price: ${anime.price}</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.viewButton} onClick={handleLink}>View Details</button>
                    <button 
                        className={`${styles.addButton}`} 
                        onClick={addCard}
                        
                    >
                        {isAdded ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
        </>    );
}

export default Card;
