import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const api = {
    // Menyu
    getMenu: () => axios.get(`${API_URL}/menu/`),
    getMenuItem: (id) => axios.get(`${API_URL}/menu/${id}`),
    createMenuItem: (data) => axios.post(`${API_URL}/menu/`, data),
    deleteMenuItem: (id) => axios.delete(`${API_URL}/menu/${id}`),

    // Buyurtmalar
    createOrder: (data) => axios.post(`${API_URL}/orders/`, data),
    getOrders: () => axios.get(`${API_URL}/orders/`),
    updateOrderStatus: (id, status) => axios.patch(`${API_URL}/orders/${id}/status?status=${status}`),

    // Auth
    login: (data) => axios.post(`${API_URL}/auth/login`, data),
    register: (data) => axios.post(`${API_URL}/auth/register`, data),
};
