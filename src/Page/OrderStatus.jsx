import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ProgressBar from 'progressbar.js';
import styles from './OrderStatus.module.css';
import { ReactComponent as DeliveryTruck } from '../asset/svg/delivery-truck-svgrepo-com.svg';

const OrderStatus = () => {
    const { id } = useParams();
    const [orderStatus, setOrderStatus] = useState('processing');
    const [orderDetails, setOrderDetails] = useState(null);
    const progressBarRef = useRef(null);
    const truckRef = useRef(null);

    useEffect(() => {
        const fetchOrderStatus = async () => {
            try {
                const response = await fetch(`http://192.168.1.19/api/orders/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch order status');
                }
                const data = await response.json();
                console.log(data);
                setOrderStatus(data.status);
            } catch (error) {
                console.error('Error fetching order status:', error);
            }
        };

        fetchOrderStatus();
    }, [id]);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch order details');
                }
                const data = await response.json();
                setOrderDetails(data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [id]);

    useEffect(() => {
        if (progressBarRef.current && truckRef.current) {
            let progress;
            switch(orderStatus) {
                case 'processing': progress = 0.25; break;
                case 'packed': progress = 0.5; break;
                case 'shipped': progress = 0.75; break;
                case 'delivered': progress = 1; break;
                default: progress = 0;
            }

            const bar = new ProgressBar.Line(progressBarRef.current, {
                strokeWidth: 4,
                easing: 'easeInOut',
                duration: 1400,
                color: '#FFEA82',
                trailColor: '#eee',
                trailWidth: 1,
                svgStyle: {width: '100%', height: '100%'},
                from: { color: '#FFEA82' },
                to: { color: '#ED6A5A' },
                step: (state, bar) => {
                    bar.path.setAttribute('stroke', state.color);
                }
            });

            const startTime = Date.now();
            const duration = 1400; // match this with the duration in ProgressBar options

            function animateTruck() {
                const now = Date.now();
                const timeFraction = Math.min((now - startTime) / duration, 1);
                if (truckRef.current) {
                    truckRef.current.style.left = `${(timeFraction * progress * 100)-5}%`;
                }
                if (timeFraction < 1) {
                    requestAnimationFrame(animateTruck);
                }
            }

            bar.animate(progress);
            requestAnimationFrame(animateTruck);
        }
    }, [orderStatus]);

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.orderStatusContainer}>
            <h2 className={styles.orderStatusTitle}>Order Status</h2>
            <div className={styles.progressBarContainer}>
                <div ref={progressBarRef} className={styles.progressBar}></div>
                <div ref={truckRef} className={styles.truckContainer}>
                    <DeliveryTruck className={styles.truck} />
                </div>
            </div>
            <div className={styles.statusSteps}>
                <div className={`${styles.step} ${orderStatus === 'processing' ? styles.active : ''}`}>Processing</div>
                <div className={`${styles.step} ${orderStatus === 'packed' ? styles.active : ''}`}>Packed</div>
                <div className={`${styles.step} ${orderStatus === 'shipped' ? styles.active : ''}`}>Shipped</div>
                <div className={`${styles.step} ${orderStatus === 'delivered' ? styles.active : ''}`}>Delivered</div>
            </div>
            <div className={styles.orderDetails}>
                <h3>Order Details</h3>
                <p>Product Name: {orderDetails.title}</p>
                <p>Product Price: ${orderDetails.price}</p>
                <p>Product status: {orderStatus}</p>
                <p>Product Category: {orderDetails.category}</p>
                <p>Total Amount: ${orderDetails.price}</p>
            </div>
        </div>
    );
};

export default OrderStatus;
