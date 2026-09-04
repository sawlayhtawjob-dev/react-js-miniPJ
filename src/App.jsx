import './App.css';
import React, { useState, useEffect } from 'react';
import ControlDrawer from './components/ControlDrawer';
import CanvasPreview from './components/CanvasPreview';

export default function App() {
  const [cardData, setCardData] = useState(() => {
    const saved = localStorage.getItem("inviteCraft_react_data");
    return saved ? JSON.parse(saved) : {
      title: "YOU ARE CORDIALLY INVITED TO CELEBRATE",
      name: "ALEX'S 25TH BIRTHDAY",
      date: "OCT 12, 2026",
      location: "GRAND BALLROOM",
      shape: "Arch Top",
      bgColor: "#fffbe6",
      isVip: true
    };
  });

  const [error, setError] = useState("");
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    localStorage.setItem("inviteCraft_react_data", JSON.stringify(cardData));
  }, [cardData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCardData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (name === "name" && value.trim() !== "") {
      setError("");
    }
  };

  const fetchTemplates = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setTemplates(data);
    } catch (err) {
      setError("Failed to load templates from API");
    }
  };

  const applyTemplate = (tpl) => {
    setCardData((prev) => ({
      ...prev,
      title: tpl.title.toUpperCase(),
      date: `NOV ${tpl.id + 10}, 2026`,
      location: `HALL ${tpl.userId}`
    }));
  };

  return (
    <div style={{ display: 'flex', gap: '30px', padding: '30px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <ControlDrawer
        cardData={cardData}
        handleChange={handleChange}
        error={error}
        fetchTemplates={fetchTemplates}
        templates={templates}
        applyTemplate={applyTemplate}
      />
      <CanvasPreview cardData={cardData} />
    </div>
  );
}