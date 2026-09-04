// src/PreviewCard.jsx
export default function PreviewCard({ cardData }) {
  const { title, name, shape, bgColor, isVip } = cardData;

  return (
    <div style={{
      padding: '30px',
      border: '2px solid gold',
      backgroundColor: bgColor,
      borderRadius: shape === "Arch Top" ? "100px 100px 10px 10px" : "10px",
      width: '220px',
      textAlign: 'center',
      position: 'relative'
    }}>
      {isVip && (
        <span style={{
          backgroundColor: 'gold',
          color: 'black',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '10px',
          fontWeight: 'bold',
          display: 'inline-block',
          marginBottom: '10px'
        }}>
          ★ VIP PASS
        </span>
      )}

      <p style={{ fontSize: '11px', color: '#666', letterSpacing: '1px' }}>{title}</p>
      <h3>{name || "Your Name Here"}</h3>
      <small>Shape: {shape}</small>
    </div>
  );
}