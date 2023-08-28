import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "~/components/userContext";
import styles from "~/styles/Cart.module.css"

const CART_URL = "http://localhost:3001/api/cart";

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const { user } = useUser();

    useEffect(() => {
        if (user && user.id) {
            axios.get(`${CART_URL}?userId=${user.id}`)
                .then(response => {
                    if (response.data && response.data.length > 0) {
                        setCartItems(response.data[0].cartItems);
                    }
                })
                .catch(error => {
                    console.error("Error fetching cart items:", error);
                });
        }
    }, [user]);

    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-xl-12">
                        <div className={styles['cart-container']}>
                            <h2 className={styles['cart-heading']}>Giỏ hàng của bạn</h2>
                            <div className={styles['cart-list']}>
                                <div className={styles['select-all']}>
                                    <input type="checkbox" /> Chọn tất cả
                                </div>
                                <ul className={styles['list-head']}>
                                    <li className={styles['head-item']}>Sản phẩm</li>
                                    <li className={styles['head-item']}>Đơn giá</li>
                                    <li className={styles['head-item']}>Số lượng</li>
                                    <li className={styles['head-item']}>Thành tiền</li>
                                    <li className={styles['head-item']}>Thao tác</li>
                                </ul>
                                {cartItems.length === 0 ? (
                                    <p>Giỏ hàng trống!</p>
                                ) : cartItems.map(item => (
                                    <div className={styles['cart-item']} key={item.id}>
                                        <div className={styles['product-details']}>
                                            <input className={styles['product-check']} type="checkbox" />
                                            <Link className={styles['product-link']} href={item.link}>
                                                <img className={styles['product-image']} src={item.image} alt="Product image" width={80} />
                                                <span className={styles['product-name']}>{item.productName}</span>
                                            </Link>
                                        </div>
                                        <div className={styles['product-price']}>
                                            <span className={styles['price-old']}>{item.price_old}</span>
                                            <span style={{ marginLeft: "10px" }} className={styles['price-new']}>{item.price_new}</span>
                                        </div>
                                        <div className={styles['product-quantity']}>
                                            <button className={`${styles.btn} ${styles['quantity-decrease']}`}>-</button>
                                            <input type="text" value={item.quantity} />
                                            <button className={`${styles.btn} ${styles['quantity-increase']}`}>+</button>
                                        </div>
                                        <div className={styles['product-amount']}>
                                            <span>1000000</span>
                                        </div>
                                        <div className={styles['product-action']}>
                                            <button className={styles.delete}>Xóa</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cart;
