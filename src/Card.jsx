// src/Card.jsx
import { useState } from 'react';

export default function Card() {
  // 1. Data (State) ထိန်းချုပ်ခြင်း
  const [name, setName] = useState("Eleanor");
  const [shape, setShape] = useState("Standard");

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Card Customizer Demo</h2>

      {/* Button နှိပ်ပြီး Shape ပြောင်းခြင်း */}
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setShape("Standard")}>Standard</button>
        <button onClick={() => setShape("Arch Top")}>Arch Top</button>
      </div>

      {/* Input စာရိုက်ပြီး Name ပြောင်းခြင်း */}
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />

      {/* Preview ပြသသည့်နေရာ */}
      <div style={{
        margin: '20px auto 0px',
        padding: '30px',
        border: '2px solid gold',
        backgroundColor: '#fffbe652',
        borderRadius: shape === "Arch Top" ? "100px 100px 10px 10px" : "10px",
        width: '200px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '12px', color: 'gold' }}>YOU ARE INVITIED</p>
        <h3>{name}</h3>
        <small>Shape: {shape}</small>
      </div>
    </div>
  );
}