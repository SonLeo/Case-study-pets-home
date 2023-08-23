import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from "~/styles/Form.module.css";
import { useUser } from "./userContext";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setUser } = useUser();

    const REGEX = {
        emailOrPhone: /^(?:[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+|0[1-9][0-9]{8})$/,
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        if (loading) return;
        setLoading(true);

        try {
            const usersResponse = await axios.get("http://localhost:3001/api/users");
            const matchedUser = usersResponse.data.find(user =>
                (user.email === values.emailOrPhone || user.phone === values.emailOrPhone) &&
                user.password === values.password
            );

            if (matchedUser) {
                const token = uuidv4();
                localStorage.setItem("userToken", token);

                alert("Đăng nhập thành công!");
                setUser(matchedUser);
                router.push('/');
            } else {
                alert("Sai tài khoản hoặc mật khẩu!");
            }
        } catch (error) {
            alert("Có lỗi trong quá trình đăng nhập. Hãy thử lại!")
            console.error("Login error:", error);
        }
        setLoading(false);
        setSubmitting(false);
    }

    return (
        <Formik
            initialValues={{
                emailOrPhone: "",
                password: ""
            }}
            onSubmit={handleSubmit}
            validate={values => {
                const errors = {}

                if (!values.emailOrPhone) {
                    errors.emailOrPhone = "Mục này không được để trống!"
                } else if (!REGEX.emailOrPhone.test(values.emailOrPhone)) {
                    errors.emailOrPhone = "Email hoặc số điện thoại sai định dạng"
                }

                if (!values.password) {
                    errors.password = "Mục này không được để trống"
                }

                return errors;
            }}
        >
            {({ values, errors, handleChange, handleSubmit, setFieldTouched, touched }) => (
                <div className={styles.main}>
                    <form id={styles['form-login']} className={styles.form} onSubmit={handleSubmit}>
                        <h3 className={styles.heading}>Đăng nhập</h3>
                        <div className={`${styles['form-group']} ${errors.emailOrPhone && touched.emailOrPhone ? styles.invalid : ""}`}>
                            <label className={styles['form-label']} htmlFor="emailOrPhone">Email / SĐT: <span className={styles.required}>*</span></label>
                            <input
                                name="emailOrPhone"
                                id={styles.emailOrPhone}
                                placeholder="VD: 0866211334"
                                className={styles['form-control']}
                                value={values.emailOrPhone}
                                onChange={handleChange}
                                onBlur={() => setFieldTouched("emailOrPhone", true)}
                            />
                            {errors.emailOrPhone && touched.emailOrPhone && <span className={styles['form-message']}>{errors.emailOrPhone}</span>}
                        </div>

                        <div className={`${styles['form-group']} ${errors.password && touched.password ? styles.invalid : ""}`}>
                            <label className={styles['form-label']} htmlFor="password">Password: <span className={styles.required}>*</span></label>
                            <input
                                type="password"
                                name="password"
                                id={styles.password}
                                placeholder="Nhập mật khẩu"
                                className={styles['form-control']}
                                value={values.password}
                                onChange={handleChange}
                                onBlur={() => setFieldTouched("password", true)}
                            />
                            {errors.password && touched.password && <span className={styles['form-message']}>{errors.password}</span>}
                        </div>

                        <button type="submit" className={styles['form-submit']}>Đăng nhập</button>
                    </form>
                </div>
            )}
        </Formik>
    )
}

export default Login;
