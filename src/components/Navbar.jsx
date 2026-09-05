import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ searchQuery, setSearchQuery }) {
  return (
    <header style={{
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="app-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>⚡</span>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            TechStore POS
          </h2>
        </div>

        {/* Dynamic Search Bar */}
        <div style={{ position: 'relative', width: '320px' }}>
          <input
            type="text"
            className="modern-input"
            placeholder="Search items, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '36px' }}
          />
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: '14px' }}>🔍</span>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '12px' }}>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            🛒 POS / Terminal
          </NavLink>
          <NavLink to="/inventory" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            📦 Stock Inventory
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            📜 Sales History
          </NavLink>
        </nav>
      </div>

      <style>{`
        .nav-link {
          color: var(--text-muted);
          text-decoration: none;
          padding: 8px 16px;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s;
        }
        .nav-link:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.05);
        }
        .nav-link.active {
          color: var(--accent-primary);
          background: rgba(56, 189, 248, 0.1);
        }
      `}</style>
    </header>
  );
}