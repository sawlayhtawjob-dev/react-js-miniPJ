import React, { useState } from 'react';

export default function InventoryPage({ products, onSaveProduct }) {
  const [formData, setFormData] = useState({ name: '', barcode: '', category: '', price: '', stock: '', image: '' });
  const [editingId, setEditingId] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProduct({ ...formData, id: editingId || Date.now() }, editingId);
    setFormData({ name: '', barcode: '', category: '', price: '', stock: '', image: '' });
    setEditingId(null);
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setFormData(p);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="glass-panel">
        <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '18px' }}>
          {editingId ? '✏️ Edit Inventory Item' : '➕ Add New Product'}
        </h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(180px, 1fr) )', gap: '12px' }}>
          <input type="text" className="modern-input" placeholder="Product Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="text" className="modern-input" placeholder="Barcode / SKU Number" value={formData.barcode} onChange={(e) => setFormData({ ...formData, barcode: e.target.value })} />
          <input type="text" className="modern-input" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
          <input type="number" className="modern-input" placeholder="Price (Ks)" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
          <input type="number" className="modern-input" placeholder="Stock Qty" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: '12px', color: 'var(--text-muted)' }} />
          
          <button type="submit" className="btn-primary" style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
            {editingId ? 'Save Changes' : 'Create Product'}
          </button>
        </form>
      </div>

      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px' }}>Image</th>
              <th style={{ padding: '16px' }}>Name</th>
              <th style={{ padding: '16px' }}>Barcode</th>
              <th style={{ padding: '16px' }}>Category</th>
              <th style={{ padding: '16px' }}>Price</th>
              <th style={{ padding: '16px' }}>Stock</th>
              <th style={{ padding: '16px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 16px' }}>
                  <img src={p.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                </td>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>{p.name}</td>
                <td style={{ padding: '12px 16px', color: 'var(--accent-primary)' }}>{p.barcode || p.id}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{p.category}</td>
                <td style={{ padding: '12px 16px', color: 'var(--accent-primary)', fontWeight: 600 }}>{Number(p.price).toLocaleString()} Ks</td>
                <td style={{ padding: '12px 16px' }}>{p.stock}</td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => handleEdit(p)} style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-warning)', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}