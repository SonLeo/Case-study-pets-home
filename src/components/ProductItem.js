import Link from 'next/link';
import React from 'react';
import styles from '~/styles/ProductItem.module.css'

const ProductItem = ({ product }) => {
    return (
        <div className={styles['product-item']}>
            <Link className={styles['product-link']} href={product.link} title={product.title}>
                <div className={styles['product-img']}>
                    <img src={product.image} alt={product.title} />
                </div>
                <h4 className={styles['product-name']}>{product.title}</h4>
                <div className={styles['product-price']}>
                    <span className={styles['price-old']}>{product.price_old}</span>
                    <span style={product.price_old ? { marginLeft: "10px" } : {}} className={styles['price-new']}>{product.price_new}</span>
                </div>
                <div className={styles['product-action']}>
                    <span className={styles['product-liked']}>
                        <img src={product.like ? '/assets/icons/Heart-solid-red.svg' : '/assets/icons/Heart-line.svg'} />
                    </span>
                    <div className={styles['product-rating']}>
                        <img className={styles['product-star']} src={product.rate >= 1 ? '/assets/icons/Star-solid-gold.svg' : '/assets/icons/Star-line.svg'} />
                        <img className={styles['product-star']} src={product.rate >= 2 ? '/assets/icons/Star-solid-gold.svg' : '/assets/icons/Star-line.svg'} />
                        <img className={styles['product-star']} src={product.rate >= 3 ? '/assets/icons/Star-solid-gold.svg' : '/assets/icons/Star-line.svg'} />
                        <img className={styles['product-star']} src={product.rate >= 4 ? '/assets/icons/Star-solid-gold.svg' : '/assets/icons/Star-line.svg'} />
                        <img className={styles['product-star']} src={product.rate >= 5 ? '/assets/icons/Star-solid-gold.svg' : '/assets/icons/Star-line.svg'} />
                    </div>
                    <div className={styles['product-sold']}>{product.sold} đã bán</div>
                </div>
            </Link>

            <div className={styles['button-block']}>
                <button className={`${styles['btn-add-cart']} ${styles.btn}`}>
                    Thêm
                    <div className={styles['add-cart-icon']}>
                        <img src='/assets/icons/Add-cart-solid.png' />
                    </div>
                </button>
                <button className={`${styles['btn-buy']} ${styles.btn}`}>Mua ngay</button>
            </div>
        </div>
    );
};

export default ProductItem;
