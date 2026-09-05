import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import POSPage from './pages/POSPage';
import InventoryPage from './pages/InventoryPage';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([
    { id: 1, barcode: '880123456789', name: 'Samsung TV 55" 4K', category: 'TV', price: 1350000, stock: 8, image: 'https://via.placeholder.com/150' },
    { id: 2, barcode: '880987654321', name: 'Panasonic AC 1.5HP Inverter', category: 'AC', price: 1200000, stock: 4, image: 'https://via.placeholder.com/150' }
  ]);
  const [orders, setOrders] = useState([]);

  const handleSaveProduct = (productData, isEdit) => {
    if (isEdit) {
      setProducts(products.map(p => p.id === isEdit ? productData : p));
    } else {
      setProducts([...products, productData]);
    }
  };

  const handleCheckout = (orderData) => {
    setOrders([orderData, ...orders]);
    setProducts(products.map(p => {
      const cartItem = orderData.cart.find(ci => ci.id === p.id);
      return cartItem ? { ...p, stock: p.stock - cartItem.qty } : p;
    }));
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.barcode && p.barcode.includes(searchQuery))
  );

  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="app-container">
        <Routes>
          <Route path="/" element={<POSPage products={filteredProducts} onCheckout={handleCheckout} />} />
          <Route path="/inventory" element={<InventoryPage products={products} onSaveProduct={handleSaveProduct} />} />
          <Route path="/history" element={<HistoryPage orders={orders} />} />
        </Routes>
      </main>
    </div>
  );
}