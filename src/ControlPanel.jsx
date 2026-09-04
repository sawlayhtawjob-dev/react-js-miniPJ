// src/ControlPanel.jsx
export default function ControlPanel({ cardData, handleChange, setCardData, error, setError }) {
  const colors = ["#fffbe6", "#e6f7ff", "#ffe6e6", "#e6ffe6"];

  const handleSubmit = (e) => {
    e.preventDefault(); // Page Refresh မဖြစ်အောင် တားဆီးခြင်း
    
    // Simple Validation Rule
    if (cardData.name.trim() === "") {
      setError("Please enter a name for the card!");
      return;
    }

    alert("Card saved successfully!");
  };

  return (
    <form 
      onSubmit={handleSubmit}
      style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', width: '280px' }}
    >
      <h3>Card Control</h3>

      {/* Error Message ပြသခြင်း */}
      {error && (
        <div style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>
          ⚠️ {error}
        </div>
      )}

      {/* 1. Title Input */}
      <div style={{ marginBottom: '10px' }}>
        <label>Event Title:</label> <br />
        <input 
          type="text" 
          name="title" 
          value={cardData.title} 
          onChange={handleChange} 
        />
      </div>

      {/* 2. Name Input */}
      <div style={{ marginBottom: '10px' }}>
        <label>Name:</label> <br />
        <input 
          type="text" 
          name="name" 
          value={cardData.name} 
          onChange={handleChange} 
        />
      </div>

      {/* 3. Shape selection */}
      <div style={{ marginBottom: '10px' }}>
        <label>Shape:</label> <br />
        <button 
          type="button" 
          onClick={() => setCardData((prev) => ({ ...prev, shape: "Standard" }))}
        >
          Standard
        </button>
        <button 
          type="button" 
          onClick={() => setCardData((prev) => ({ ...prev, shape: "Arch Top" }))}
        >
          Arch Top
        </button>
      </div>

      {/* 4. Preset Color Buttons */}
      <div style={{ marginBottom: '10px' }}>
        <label>Preset Themes:</label> <br />
        <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCardData((prev) => ({ ...prev, bgColor: c }))}
              style={{
                backgroundColor: c,
                width: '25px',
                height: '25px',
                border: cardData.bgColor === c ? '2px solid black' : '1px solid #ccc',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      </div>

      {/* 5. VIP Toggle */}
      <div style={{ marginBottom: '15px' }}>
        <label>
          <input 
            type="checkbox" 
            name="isVip"
            checked={cardData.isVip} 
            onChange={handleChange} 
          />
          VIP Guest status
        </label>
      </div>

      <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>
        Save Card
      </button>
    </form>
  );
}