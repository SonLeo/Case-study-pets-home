import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./Checkout.module.css";
import { useUser } from "~/components/userContext";
import { formatCurrency } from '~/utils/commonUtils';
import ShipmentDetails from "./shipmentDetails/ShipmentDetails";
import Discount from "./discount/discount";
import PaymentMethods from "./payment/PaymentMethods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEquals, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const CART_URL = "http://localhost:3001/api/carts";
const USERS_URL = "http://localhost:3001/api/users";

const Checkout = () => {
    const { user } = useUser();
    const [cartItems, setCartItems] = useState([]);
    const shippingCost = 30000;

    const [shippingInfo, setShippingInfo] = useState({
        receiver: user ? user.username : "",
        phone: user ? user.phone : "",
        address: user ? user.address : "",
        note: ""
    });

    const handleShippingInfoChange = (updatedInfo) => {
        setShippingInfo(updatedInfo);
    };

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

    const handleCheckout = async () => {
        try {
            const response = await axios.put(`${USERS_URL}/${user.id}`, {
                ...user,
                shippingDetails: shippingInfo
            });

            if (response.status === 200) {
                console.log("Shipping details updated successfully.");
            } else {
                console.error("Failed to update shipping details.");
            }
        } catch (error) {
            console.error("Error updating shipping details:", error);
        }
    }

    const calculateTotalProductPrice = () => {
        return cartItems.reduce((acc, item) => acc + (item.price_new * item.quantity), 0);
    }

    const calculateTotalAmount = () => {
        return calculateTotalProductPrice() + shippingCost;
    }

    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-xl-12">
                        <h2 className={styles['checkout-heading']}>Thanh toán</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-xl-6">
                        <h3 className={styles['checkout-sub-heading']}>Sản phẩm</h3>
                        <ul className={styles['product-list']}>
                            {cartItems.map(item => (
                                <li className={styles['product-item']} key={item.id}>
                                    <div className={styles['product-image']}><img src={item.image} /></div>
                                    <div className={styles['product-details']}>
                                        <h4 className={styles['product-name']}>{item.productName}</h4>
                                        <div>
                                            <span className={styles['product-price']}>{formatCurrency(item.price_new)}</span>
                                            <span className={styles['product-icon']}><FontAwesomeIcon icon={faTimes} /></span>
                                            <span className={styles['product-quantity']}>{item.quantity}</span>
                                            <span className={styles['product-icon']}><FontAwesomeIcon icon={faEquals} /></span>
                                            <span className={styles['product-amount']}>{formatCurrency(item.price_new * item.quantity)}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className={styles['calculate']}>
                            <div className={styles['summary']}>
                                <div className={styles['summary-item']}>
                                    <span className={styles['summary-label']}>Tạm tính:</span>
                                    <span className={styles['summary-value']}>{formatCurrency(calculateTotalProductPrice())}</span>
                                </div>
                                <div className={styles['summary-item']}>
                                    <span className={styles['summary-label']}>Phí vận chuyển:</span>
                                    <span className={styles['summary-value']}>{formatCurrency(30000)}</span>
                                </div>
                            </div>
                            <div className={styles['total']}>
                                <span className={styles['total-label']}>Tổng cộng:</span>
                                <span className={styles['total-value']}>{formatCurrency(calculateTotalAmount())}</span>
                            </div>
                        </div>
                        <div className={styles['actions']}>
                            <div className="row">
                                <div className="col-lg-6 col-xl-6">
                                    <div className={styles['back-to-cart']}>
                                        <Link href="http://localhost:3000/cart">Quay lại giỏ hàng</Link>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-xl-6">
                                    <button className={styles['checkout-btn']} onClick={handleCheckout}>Đặt hàng ngay   </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-6">
                        <ShipmentDetails user={user} onShippingInfoChange={handleShippingInfoChange} />
                        <Discount />
                        <PaymentMethods />
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Checkout;
