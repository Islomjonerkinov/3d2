import React, { useState, useEffect } from 'react';
import { api } from '../api';

const AdminPanel = () => {
    const [menu, setMenu] = useState([]);
    const [orders, setOrders] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: '', image_url: '' });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const menuRes = await api.getMenu();
        const ordersRes = await api.getOrders();
        setMenu(menuRes.data);
        setOrders(ordersRes.data);
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        await api.createMenuItem(newItem);
        setNewItem({ name: '', description: '', price: '', category: '', image_url: '' });
        loadData();
    };

    const handleDeleteItem = async (id) => {
        if (window.confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
            await api.deleteMenuItem(id);
            loadData();
        }
    };

    const updateStatus = async (id, status) => {
        await api.updateOrderStatus(id, status);
        loadData();
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Boshqaruv Paneli</h1>

            {/* Taom qo'shish formasi */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-10">
                <h2 className="text-xl font-semibold mb-4">Yangi Taom Qo'shish</h2>
                <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" placeholder="Nomi" className="border p-2 rounded" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required />
                    <input type="text" placeholder="Kategoriya" className="border p-2 rounded" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} required />
                    <input type="number" placeholder="Narxi" className="border p-2 rounded" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} required />
                    <input type="text" placeholder="Rasm URL" className="border p-2 rounded" value={newItem.image_url} onChange={e => setNewItem({...newItem, image_url: e.target.value})} />
                    <textarea placeholder="Tavsif" className="border p-2 rounded md:col-span-2" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})}></textarea>
                    <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Qo'shish</button>
                </form>
            </div>

            {/* Menyu boshqaruvi */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Menyu Boshqaruvi</h2>
                <table className="w-full bg-white rounded-lg overflow-hidden shadow">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">Nomi</th>
                            <th className="p-3 text-left">Kategoriya</th>
                            <th className="p-3 text-left">Narxi</th>
                            <th className="p-3 text-center">Amallar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menu.map(item => (
                            <tr key={item.id} className="border-b">
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.category}</td>
                                <td className="p-3">{item.price} UZS</td>
                                <td className="p-3 text-center">
                                    <button onClick={() => handleDeleteItem(item.id)} className="text-red-500 hover:underline">O'chirish</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Buyurtmalar boshqaruvi */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Kelgan Buyurtmalar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold">Buyurtma #{order.id}</span>
                                <span className={`px-2 py-1 rounded text-xs ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">Jami: {order.total_price} UZS</p>
                            <div className="flex gap-2">
                                <button onClick={() => updateStatus(order.id, 'Preparing')} className="text-xs bg-orange-500 text-white px-2 py-1 rounded">Tayyorlash</button>
                                <button onClick={() => updateStatus(order.id, 'Delivered')} className="text-xs bg-green-500 text-white px-2 py-1 rounded">Yetkazish</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
