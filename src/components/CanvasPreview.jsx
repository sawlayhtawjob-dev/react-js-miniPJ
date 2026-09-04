import React from 'react';

export default function CanvasPreview({ cardData }) {
  const getShapeStyle = () => {
    if (cardData.shape === "Arch Top") return "120px 120px 12px 12px";
    if (cardData.shape === "Cut Corner") return "0px 25px 0px 25px";
    return "12px";
  };

  return (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#eef2f5', padding: '40px', borderRadius: '12px' }}>
      <div
        className="printable-card"
        style={{
          width: '320px',
          minHeight: '420px',
          backgroundColor: cardData.bgColor,
          borderRadius: getShapeStyle(),
          border: '3px solid gold',
          padding: '30px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          textAlign: 'center',
          position: 'relative',
          transition: 'all 0.3s ease'
        }}
      >
        {cardData.isVip && (
          <span style={{
            position: 'absolute',
            top: '15px',
            right: 'calc(50% - 39px)',
            backgroundColor: 'gold',
            color: '#000',
            padding: '3px 10px',
            borderRadius: '20px',
            fontSize: '10px',
            fontWeight: 'bold'
          }}>
            ★ VIP PASS
          </span>
        )}

        <p style={{ letterSpacing: '2px', fontSize: '12px', color: '#666', marginTop: '40px' }}>
          {cardData.title || "YOUR INVITATION TITLE"}
        </p>

        <h1 style={{ fontFamily: 'Georgia, serif', color: '#2c3e50', margin: '20px 0' }}>
          Happy Birthday!
        </h1>

        <h2 style={{ color: '#d4af37', fontSize: '40px', marginTop: '30px' }}>
          {cardData.name || "Host Name"}
        </h2>

        {/* Dynamic Date & Location Display */}
        <div style={{ marginTop: '40px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '15px', fontSize: '12px', color: '#888' }}>
          <p style={{ margin: '4px 0' }}>DATE: {cardData.date || 'OCT 12, 2026'}</p>
          <p style={{ margin: '4px 0' }}>LOCATION: {cardData.location || 'GRAND BALLROOM'}</p>
        </div>
      </div>
    </div>
  );
}