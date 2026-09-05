import React, { useState, useRef, useEffect } from 'react';
import BarcodeScannerModal from '../components/BarcodeScannerModal';

export default function POSPage({ products, onCheckout }) {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  
  const barcodeInputRef = useRef(null);

  // Focus Keep for Physical Barcode Scanner
  useEffect(() => {
    barcodeInputRef.current?.focus();
  }, []);

  const handleBarcodeScan = (code) => {
    const product = products.find(p => p.barcode === code || p.id.toString() === code);
    if (product) {
      addToCart(product);
      setBarcodeInput('');
    } else {
      alert(`Barcode (${code}) ဖြင့် ပစ္စည်းမတွေ့ပါ!`);
      setBarcodeInput('');
    }
  };

  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    if (barcodeInput.trim()) {
      handleBarcodeScan(barcodeInput.trim());
    }
  };

  const addToCart = (product) => {
    if (product.stock <= 0) return alert('စတော့ ကုန်နေပါသည်');
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.qty >= product.stock) return alert('လက်ကျန် စတော့ထက် ပိုမဝယ်နိုင်ပါ');
      setCart(cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('Cart ထဲ ပစ္စည်းထည့်ပါ');

    const orderData = {
      orderId: `ORD-${Date.now().toString().slice(-4)}`,
      customerName,
      phone,
      cart,
      totalAmount,
      dateTime: new Date().toLocaleString(),
      status: 'Paid'
    };

    onCheckout(orderData);
    setCart([]);
    setCustomerName('');
    setPhone('');
    alert('Order အတည်ပြုပြီးပါပြီ!');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
      {/* Camera Barcode Scanner Modal */}
      {isScannerOpen && (
        <BarcodeScannerModal 
          onScanSuccess={handleBarcodeScan} 
          onClose={() => setIsScannerOpen(false)} 
        />
      )}

      {/* Left Column: Barcode & Products Grid */}
      <div>
        {/* Barcode Input & Camera Scan Button */}
        <div className="glass-panel" style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <form onSubmit={handleBarcodeSubmit} style={{ flex: 1 }}>
            <input
              ref={barcodeInputRef}
              type="text"
              className="modern-input"
              placeholder="🏷️ Scan Barcode or enter code..."
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
            />
          </form>
          <button 
            type="button" 
            className="btn-primary" 
            onClick={() => setIsScannerOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
          >
            📷 Camera Scan
          </button>
        </div>

        <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '18px', fontWeight: 700 }}>Available Products</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
          {products.map(p => (
            <div key={p.id} className="glass-panel" style={{ textAlign: 'center', transition: 'transform 0.2s' }}>
              <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '12px' }}>
                <img src={p.image} alt={p.name} style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px' }}>{p.name}</h4>
              <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: 'var(--text-muted)' }}>Code: {p.barcode || p.id}</p>
              <p style={{ margin: '0 0 8px 0', color: 'var(--accent-primary)', fontWeight: 700 }}>{Number(p.price).toLocaleString()} Ks</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                <span>Stock: <strong style={{ color: p.stock > 0 ? 'var(--accent-success)' : 'var(--accent-danger)' }}>{p.stock}</strong></span>
                <button
                  onClick={() => addToCart(p)}
                  disabled={p.stock <= 0}
                  className="btn-primary"
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Checkout Panel */}
      <div className="glass-panel" style={{ height: 'fit-content' }}>
        <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '18px' }}>🛒 Current Checkout</h3>
        
        {cart.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>Cart ထဲတွင် ပစ္စည်းမရှိသေးပါ</p>
        ) : (
          <div style={{ marginBottom: '16px', maxHeight: '200px', overflowY: 'auto' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px dashed var(--border-color)', fontSize: '14px' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.qty} x {item.price.toLocaleString()} Ks</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 700 }}>{(item.price * item.qty).toLocaleString()} Ks</span>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: 'var(--accent-danger)', cursor: 'pointer' }}>❌</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <hr style={{ borderColor: 'var(--border-color)', margin: '16px 0' }} />

        <form onSubmit={handleOrderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Customer Name</label>
            <input type="text" className="modern-input" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="ဦးအေး" />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Phone Number</label>
            <input type="text" className="modern-input" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="09xxxxxxx" />
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', margin: '8px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 700 }}>
              <span>Total Amount:</span>
              <span style={{ color: 'var(--accent-primary)' }}>{totalAmount.toLocaleString()} Ks</span>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)' }}>
            Confirm & Pay
          </button>
        </form>
      </div>
    </div>
  );
}