// src/App.jsx
import { useState, useEffect } from 'react'; // 1. useEffect ကို Import လုပ်ပါ
import ControlPanel from './ControlPanel';
import PreviewCard from './PreviewCard';

function App() {
  // 2. LocalStorage ထဲတွင် သိမ်းထားသော Data ရှိပါက ပြန်ထုတ်မည်၊ မရှိပါက Default Data သုံးမည်
  const [cardData, setCardData] = useState(() => {
    const savedData = localStorage.getItem("inviteCraft_card");
    return savedData ? JSON.parse(savedData) : {
      title: "WEDDING INVITATION",
      name: "Eleanor & Theodore",
      shape: "Standard",
      bgColor: "#fffbe6",
      isVip: false
    };
  });

  const [error, setError] = useState("");

  // 3. useEffect: cardData ပြောင်းလဲတိုင်း LocalStorage ထဲသို့ အလိုအလျောက် သွားရောက် သိမ်းဆည်းမည်
  useEffect(() => {
    localStorage.setItem("inviteCraft_card", JSON.stringify(cardData));
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

  return (
    <div style={{ display: 'flex', gap: '30px', padding: '30px', fontFamily: 'sans-serif' }}>
      <ControlPanel 
        cardData={cardData} 
        handleChange={handleChange}
        setCardData={setCardData}
        error={error}
        setError={setError}
      />

      <PreviewCard 
        cardData={cardData}
      />
    </div>
  );
}

export default App;