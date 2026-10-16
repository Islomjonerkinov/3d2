import React, { useState } from 'react';
import MenuPage from './pages/MenuPage';
import AdminPanel from './pages/AdminPanel';
import LoginPage from './pages/LoginPage';

function App() {
  const [page, setPage] = useState('menu');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setPage('menu');
  };

  return (
    <div className="App">
      <nav className="bg-red-600 p-4 text-white flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => setPage('menu')}>TastyRestaurant 🍔</h1>
        <ul className="flex gap-6">
          <li className="cursor-pointer hover:underline" onClick={() => setPage('menu')}>Menyu</li>
          <li className="cursor-pointer hover:underline" onClick={() => setPage('admin')}>Admin Panel</li>
          {isAuthenticated ? (
            <li className="cursor-pointer hover:underline text-yellow-300" onClick={handleLogout}>Chiqish</li>
          ) : null}
        </ul>
      </nav>

      {page === 'menu' && <MenuPage />}
      {page === 'admin' && (isAuthenticated ? <AdminPanel /> : <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />)}
    </div>
  );
}

export default App;
