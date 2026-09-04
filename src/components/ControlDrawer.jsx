import React from 'react';

export default function ControlDrawer({ cardData, handleChange, error, fetchTemplates, templates, applyTemplate }) {
  const presetColors = ["#fffbe6", "#e6f7ff", "#ffe6e6", "#e6ffe6", "#2c3e50"];

    // Print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="control-drawer" style={{ width: '320px', padding: '20px', background: '#f8f9fa', borderRadius: '12px', color: '#333', boxSizing: 'border-box' }}>
      <h2>🎨 InviteCraft Controls</h2>

      {error && <p style={{ color: 'red', fontSize: '13px' }}>⚠️ {error}</p>}

      {/* Input 1: Event Title / Headline */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>Headline Title:</label>
        <input
          type="text"
          name="title"
          value={cardData.title}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box' }}
        />
      </div>

      {/* Input 2: Names */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>Birthday Person / Host Name:</label>
        <input
          type="text"
          name="name"
          value={cardData.name}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box' }}
        />
      </div>

      {/* Dynamic Date Input Box */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>Event Date:</label>
        <input
          type="text"
          name="date"
          value={cardData.date || ''}
          onChange={handleChange}
          placeholder="e.g. OCT 12, 2026"
          style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box' }}
        />
      </div>

      {/* Dynamic Location Input Box */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>Location:</label>
        <input
          type="text"
          name="location"
          value={cardData.location || ''}
          onChange={handleChange}
          placeholder="e.g. GRAND BALLROOM"
          style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box' }}
        />
      </div>

      {/* Shape Selector */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>Card Shape:</label>
        <select 
          name="shape" 
          value={cardData.shape} 
          onChange={handleChange} 
          style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box' }}
        >
          <option value="Standard">Standard Square</option>
          <option value="Arch Top">Arch Top</option>
          <option value="Cut Corner">Corner Cut</option>
        </select>
      </div>

      {/* Preset Colors List */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>Theme Color:</label>
        <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
          {presetColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleChange({ target: { name: 'bgColor', value: color, type: 'text' } })}
              style={{
                backgroundColor: color,
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: cardData.bgColor === color ? '2px solid #000' : '1px solid #ccc',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      </div>

      {/* VIP Status Toggle */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <input
            type="checkbox"
            name="isVip"
            checked={cardData.isVip}
            onChange={handleChange}
          />
          Enable VIP Badge
        </label>
      </div>

      {/* 🖨️ Save as PDF / Print Button */}
      <button 
        type="button"
        onClick={handlePrint} 
        style={{ 
          width: '100%', 
          padding: '10px', 
          backgroundColor: '#28a745', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '6px', 
          fontWeight: 'bold', 
          cursor: 'pointer',
          marginBottom: '15px'
        }}
      >
        🖨️ Save as PDF / Print
      </button>

      {/* External API Integration Trigger */}
      <hr />
      <h4>🌐 Quick Templates (API)</h4>
      <button onClick={fetchTemplates} style={{ width: '100%', padding: '8px', cursor: 'pointer', boxSizing: 'border-box' }}>
        Load External Templates
      </button>

      {templates.length > 0 && (
        <div style={{ marginTop: '10px', maxHeight: '150px', overflowY: 'auto' }}>
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => applyTemplate(tpl)}
              style={{ padding: '6px', background: '#fff', border: '1px solid #ddd', marginBottom: '4px', cursor: 'pointer', fontSize: '12px' }}
            >
              📌 {tpl.title.slice(0, 25)}...
            </div>
          ))}
        </div>
      )}
    </div>
  );
}