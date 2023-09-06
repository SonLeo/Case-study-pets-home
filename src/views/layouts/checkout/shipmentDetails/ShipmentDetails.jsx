import { Formik } from "formik";
import { useState } from "react";
import { REGEX } from "~/utils/commonUtils";
import styles from "./ShipmentDetails.module.css";

const ShipmentDetails = ({ user, onShippingInfoChange }) => {
    const [focusedField, setFocusedField] = useState(null);
    const [showSavedAddresses, setShowSavedAddresses] = useState(false);

    const [isEditable, setIsEditable] = useState({
        receiver: false,
        phone: false,
        address: false
    });

    const toggleSavedAddresses = () => setShowSavedAddresses(prevState => !prevState);

    const toggleEditable = (field) => {
        const newEditableState = {
            receiver: false,
            phone: false,
            address: false
        };

        newEditableState[field] = true;
        setIsEditable(newEditableState);
    };

    const validate = values => {
        const errors = {}

        if (!values.receiver) {
            errors.receiver = "Tên người nhận không được để trống!";
        }

        if (!values.phone) {
            errors.phone = "Số điện thoại người nhận không được để trống!";
        } else if (values.phone && !REGEX.phone.test(values.phone)) {
            errors.phone = "Số điện thoại không hợp lệ!";
        }

        if (!values.address) {
            errors.address = "Địa chỉ nhận hàng không được để trống";
        }

        return errors;
    }

    return (
        <Formik
            initialValues={{
                receiver: user ? user.username : "",
                phone: user ? user.phone : "",
                address: user ? user.address : "",
                note: ""
            }}
            enableReinitialize={true}
            onSubmit={(values) => {
                onShippingInfoChange(values);
            }}
            validate={validate}
        >
            {({ values, errors, touched, handleChange, handleSubmit, setFieldTouched }) => (
                <div className={styles['shipment-details']}>
                    <div className={styles['shipment-header']}>
                        <h3 className={styles['shipment-heading']}>Thông tin giao hàng</h3>
                        <p className={styles['shipment-saved-address']} onClick={toggleSavedAddresses}>Chọn địa chỉ đã lưu</p>
                    </div>
                    {showSavedAddresses && (
                        <ul className={styles['saved-addresses-list']}>
                            {/* Ví dụ, bạn có thể lấy danh sách địa chỉ từ một mảng hoặc API */}
                            <li className={styles['saved-address']}>Địa chỉ 1</li>
                            <li className={styles['saved-address']}>Địa chỉ 2</li>
                            <li className={styles['saved-address']}>Địa chỉ 3</li>
                        </ul>
                    )}
                    <form className={styles['shipment-form']} onSubmit={handleSubmit}>
                        {/* receiver */}
                        <div className={`${styles['form-group']} ${isEditable.receiver && focusedField === 'receiver' ? styles['form-active'] : ''}`}>
                            <label className={styles['form-label']} htmlFor="receiver">Tên người nhận:</label>
                            <input
                                type="text"
                                name="receiver"
                                id="receiver"
                                className={styles['form-control']}
                                value={values.receiver}
                                onChange={(e) => {
                                    handleChange(e);
                                    onShippingInfoChange({
                                        ...values,
                                        [e.target.name]: e.target.value
                                    });
                                }}
                                disabled={!isEditable.receiver}
                                onFocus={() => setFocusedField('receiver')}
                                onBlur={() => {
                                    setFieldTouched("receiver", true);
                                    setFocusedField(null);
                                }}
                            />
                            <label htmlFor="receiver"><img className={styles['form-edit-icon']} src="/assets/icons/member/edit.svg" alt="Edit" onClick={() => toggleEditable('receiver')} /></label>
                            {errors.receiver && touched.receiver && <p className={styles['form-message']}>{errors.receiver}</p>}
                        </div>

                        {/* phone */}
                        <div className={`${styles['form-group']} ${isEditable.phone && focusedField === 'phone' ? styles['form-active'] : ''}`}>
                            <label className={styles['form-label']} htmlFor="phone">Số điện thoại:</label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                className={styles['form-control']}
                                value={values.phone}
                                onChange={(e) => {
                                    handleChange(e);
                                    onShippingInfoChange({
                                        ...values,
                                        [e.target.name]: e.target.value
                                    });
                                }}
                                disabled={!isEditable.phone}
                                onFocus={() => setFocusedField('phone')}
                                onBlur={() => {
                                    setFieldTouched("phone", true);
                                    setFocusedField(null);
                                }}
                            />
                            <label htmlFor="phone"><img className={styles['form-edit-icon']} src="/assets/icons/member/edit.svg" alt="Edit" onClick={() => toggleEditable('phone')} /></label>
                            {errors.phone && touched.phone && <p className={styles['form-message']}>{errors.phone}</p>}
                        </div>

                        {/* address */}
                        <div className={`${styles['form-group']} ${isEditable.address && focusedField === 'address' ? styles['form-active'] : ''}`}>
                            <label className={styles['form-label']} htmlFor="address">Địa chỉ:</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                className={`${styles['form-control']} ${styles['form-address']}`}
                                value={values.address}
                                onChange={(e) => {
                                    handleChange(e);
                                    onShippingInfoChange({
                                        ...values,
                                        [e.target.name]: e.target.value
                                    });
                                }}
                                disabled={!isEditable.address}
                                onFocus={() => setFocusedField('address')}
                                onBlur={() => {
                                    setFieldTouched("address", true);
                                    setFocusedField(null);
                                }}
                            />
                            <label htmlFor="address"><img className={styles['form-edit-icon']} src="/assets/icons/member/edit.svg" alt="Edit" onClick={() => toggleEditable('address')} /></label>
                            {errors.address && touched.address && <p className={styles['form-message']}>{errors.address}</p>}
                        </div>

                        {/* message */}
                        <div className={styles['form-group-note']}>
                            <label className={styles['from-note-label']} htmlFor="shipmentNote">Lời nhắn:</label>
                            <input
                                type="text"
                                name="note"
                                id="shipmentNote"
                                className={styles['note-control']}
                                placeholder="Lưu ý cho đơn hàng ..."
                                value={values.note}
                                onChange={(e) => {
                                    handleChange(e);
                                    onShippingInfoChange({
                                        ...values,
                                        [e.target.name]: e.target.value
                                    });
                                }}
                            />
                        </div>
                    </form>
                </div>
            )}
        </Formik>
    )
}

export default ShipmentDetails;