import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. Router ကို import လုပ်ပါ
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* 2. <App /> ကို BrowserRouter ဖြင့် ပတ်ပေးပါ */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)