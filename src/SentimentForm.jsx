import React, { useState } from 'react';

function SentimentForm() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeSentiment = async () => {
    setLoading(true);
    setError('');
    setSentiment('');

    try {
      const res = await fetch('https://api.sentimentanalysis.com/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error('Gagal analisis sentimen');

      const data = await res.json();
      setSentiment(data.sentiment);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      analyzeSentiment();
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', textAlign: 'center' }}>
      <h2>Analisis Sentimen</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="5"
          placeholder="Masukkan kalimat..."
          style={{ width: '100%', padding: '10px' }}
        />
        <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
          Analisis
        </button>
      </form>

      {loading && <p>Memproses...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {sentiment && (
        <p style={{ marginTop: '20px' }}>
          <strong>Hasil Sentimen:</strong> {sentiment}
        </p>
      )}
    </div>
  );
}

export default SentimentForm;
