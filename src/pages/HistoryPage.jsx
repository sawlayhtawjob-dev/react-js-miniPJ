import React from 'react';

export default function HistoryPage({ orders }) {
  return (
    <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
        <h3 style={{ margin: 0, fontSize: '18px' }}>📜 Order History</h3>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border-color)' }}>
            <th style={{ padding: '16px' }}>Order ID</th>
            <th style={{ padding: '16px' }}>Date & Time</th>
            <th style={{ padding: '16px' }}>Customer</th>
            <th style={{ padding: '16px' }}>Total Amount</th>
            <th style={{ padding: '16px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                Order မှတ်တမ်းများ မရှိသေးပါ
              </td>
            </tr>
          ) : (
            orders.map(ord => (
              <tr key={ord.orderId} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px', fontWeight: 700, color: 'var(--accent-primary)' }}>{ord.orderId}</td>
                <td style={{ padding: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>{ord.dateTime}</td>
                <td style={{ padding: '16px' }}>{ord.customerName} <br /><span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{ord.phone}</span></td>
                <td style={{ padding: '16px', fontWeight: 600 }}>{ord.totalAmount.toLocaleString()} Ks</td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    background: 'rgba(34, 197, 94, 0.15)',
                    color: 'var(--accent-success)',
                    fontWeight: 600
                  }}>
                    {ord.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}