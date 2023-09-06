import React, { useState } from 'react';
import styles from "./Discount.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";

const Discount = () => {
    const [selectedVoucher, setSelectedVoucher] = useState('');
    const [isVoucherListVisible, setVoucherListVisible] = useState(false);
    const vouchers = [ 
        {
            title: 'WELCOME10',
            detail: 'Giảm 10% đơn hàng đầu tiên có giá trị từ 300.000 ₫'
        },
        {
            title: 'HELLOSUMMER20',
            detail: 'Giảm 20% cho dịch vụ SPA - GROOMING từ ngày 01/04 - 07/04'
        },
        {
            title: 'HELLOFALL15',
            detail: 'Giảm 15% cho các sản phẩm quần áo từ ngày 01/09 - 07/09'
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleInputChange = (e) => {
        setSelectedVoucher(e.target.value)
    }

    const handleVoucherChange = (e) => {
        setSelectedVoucher(e.target.value);
    };

    const toggleVoucherList = (e) => {
        e.preventDefault();
        setVoucherListVisible(!isVoucherListVisible);
    };

    return (
        <>
            <h3 className={styles['discount-heading']}>Voucher <FontAwesomeIcon icon={faTicket} /></h3>
            <form onSubmit={handleSubmit} className={styles['form-group-voucher']}>
                <div className={styles['voucher-control']}>
                    <input
                        type="text"
                        name="voucher"
                        className={styles['voucher-input']}
                        placeholder="Mã giảm giá"
                        value={selectedVoucher}
                        onChange={handleInputChange}
                    />
                    <button className={`${styles['form-submit']} ${styles['form-btn']}`} type="submit">Sử dụng</button>
                    <button className={`${styles['form-toggle']} ${styles['form-btn']}`} onClick={toggleVoucherList}>{isVoucherListVisible ? "Ẩn voucher" : "Chọn voucher"}</button>
                </div>
                {isVoucherListVisible && (
                    <ul className={styles['voucher-list']}>
                        {vouchers.map(voucher => (
                            <li key={voucher.title}>
                                <label>
                                    <input
                                        type="radio"
                                        name="voucherRadio"
                                        className={styles['voucher-radio']}
                                        value={voucher.title}
                                        checked={selectedVoucher === voucher.title}
                                        onChange={handleVoucherChange}
                                    />
                                    <div className={styles['voucher-content']}>
                                        <h4 className={styles['voucher-title']}>{voucher.title}</h4>
                                        <p className={styles['voucher-detail']}>{voucher.detail}</p>
                                    </div>
                                </label>
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </>
    )
}

export default Discount;
