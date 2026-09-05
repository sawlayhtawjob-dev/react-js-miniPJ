import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function BarcodeScannerModal({ onScanSuccess, onClose }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 150 } },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        scanner.clear();
        onClose();
      },
      (errorMessage) => {
        // Scanning errors
      }
    );

    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    };
  }, [onScanSuccess, onClose]);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="glass-panel" style={{ width: '360px', background: '#1e293b', padding: '20px', textAlign: 'center' }}>
        <h3 style={{ marginTop: 0 }}>📷 Scan Barcode</h3>
        <div id="reader" style={{ width: '100%', color: '#fff' }}></div>
        <button 
          onClick={onClose} 
          style={{ marginTop: '15px', padding: '8px 16px', background: 'var(--accent-danger)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Close
        </button>
      </div>
    </div>
  );
}