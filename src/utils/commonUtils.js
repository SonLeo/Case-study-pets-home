export const REGEX = {
    emailOrPhone: /^(?:[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+|0[1-9][0-9]{8})$/,
    phone: /^(?:\+84|0)[1-9][0-9]{7,8}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/
}

export const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export const API_URLS = {
    USERS: "http://localhost:3001/api/users",
    CARTS: "http://localhost:3001/api/carts",
    ORDERS: "http://localhost:3001/api/orders"
}