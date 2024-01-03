import Link from 'next/link';
import React from 'react';
import styles from './ProductItem.module.css'
import { formatCurrency } from '~/utils/commonUtils';
import ProductRating from '../productRating/ProductRating';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useUser } from '../userContext';
import { addToCart } from '~/rudux/actions/cartActions';
import { buyNow } from '~/rudux/actions/buyNowActions';
import { useToast } from '../toastContext';

const ProductItem = ({ product }) => {
    const { user } = useUser();
    const router = useRouter();
    const dispatch = useDispatch();
    const { showSuccessToast, showErrorToast } = useToast();
    const quantity = 1;
    const selectedVariants = {};

    const handleBuyNow = () => {
        dispatch(buyNow(product, quantity, selectedVariants));
        router.push('/checkout');
    }

    const handleAddToCart = () => {
        if (user) {
            dispatch(addToCart({
                userId: user.id,
                productToAdd: {
                    ...product,
                    quantity,
                }
            }));
            showSuccessToast("Sản phẩm đã được thêm vào giỏ hàng");
        } else {
            showErrorToast("Bạn cần đăng nhập trước khi thêm sản phẩm vào giỏ hàng");
        }
    }
    return (
        <div className={styles['product-item']}>
            <Link className={styles['product-link']} href={product.link} title={product.productName}>
                <div className={styles['product-img']}>
                    <img src={product.image} alt={product.productName} />
                </div>
                <h4 className={styles['product-name']}>{product.productName}</h4>
                <div className={styles['product-price']}>
                    <span className={styles['price-old']}>{product.price_old && formatCurrency(product.price_old)}</span>
                    <span style={product.price_old ? { marginLeft: "10px" } : {}} className={styles['price-new']}>{product.price_new && formatCurrency(product.price_new)}</span>
                </div>
                <div className={styles['product-action']}>
                    <span className={styles['product-liked']}>
                        <img src={product.like ? '/assets/icons/Heart-solid-red.svg' : '/assets/icons/Heart-line.svg'} />
                    </span>
                    <ProductRating product={product} />
                    <div className={styles['product-sold']}>{product.sold} đã bán</div>
                </div>
            </Link>

            <div className={styles['button-block']}>
                <button
                    className={`${styles['btn-add-cart']} ${styles.btn}`}
                    onClick={handleAddToCart}
                >
                    Thêm
                    <div className={styles['add-cart-icon']}>
                        <img src='/assets/icons/Add-cart-solid.png' />
                    </div>
                </button>
                <button
                    className={`${styles['btn-buy']} ${styles.btn}`}
                    onClick={handleBuyNow}
                >Mua ngay</button>
            </div>
        </div>
    );
};

export default ProductItem;
