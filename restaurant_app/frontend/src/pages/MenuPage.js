import React, { useState, useEffect } from 'react';
import { api } from '../api';

const MenuPage = () => {
    const [menu, setMenu] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getMenu()
            .then(res => {
                setMenu(res.data);
                setLoading(false);
            })
            .catch(err => console.error("Menyuni yuklashda xato:", err));
    }, []);

    const addToCart = (item) => {
        setCart([...cart, item]);
        alert(`${item.name} savatga qo'shildi!`);
    };

    if (loading) return <div className="text-center mt-10 text-2xl">Yuklanmoqda...</div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-8 text-red-600">Restoran Menyusi</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {menu.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                        <img src={item.image_url || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <h2 className="text-xl font-bold">{item.name}</h2>
                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-green-600">{item.price} UZS</span>
                            <button
                                onClick={() => addToCart(item)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Qo'shish +
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Savat summary */}
            <div className="fixed bottom-5 right-5 bg-white p-4 rounded-full shadow-2xl border-2 border-red-500 cursor-pointer hover:scale-110 transition">
                <span className="font-bold">🛒 Savat: {cart.length} ta</span>
            </div>
        </div>
    );
};

export default MenuPage;
