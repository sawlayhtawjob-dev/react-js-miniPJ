import { useState, useEffect } from 'react';

function App() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // API မှ Card Sample Data များ ယူခြင်း
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
        
        if (!response.ok) {
          throw new Error('Data တောင်းယူမှု မအောင်မြင်ပါ');
        }

        const data = await response.json();
        setTemplates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>InviteCraft Cards</h1>

      {/* Loading အခြေအနေ */}
      {loading && <p>Card သတင်းအချက်အလက်များ ဆွဲယူနေပါသည်...</p>}

      {/* Error အခြေအနေ */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Data ရရှိပါက Card များကို Grid ပုံစံဖြင့် ခင်းပြခြင်း */}
      {!loading && !error && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {templates.map((item) => (
            <div key={item.id} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: '#f9f9f9'
            }}>
              <h3 style={{ textTransform: 'capitalize' }}>{item.title.slice(0, 20)}</h3>
              <p>{item.body}</p>
              <button style={{
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Use Template
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;