import React, { useState } from 'react';
import './App.css';

function App() {
  const [seq1, setSeq1] = useState('');
  const [seq2, setSeq2] = useState('');
  const [matrix, setMatrix] = useState([]);
  const [score, setScore] = useState(null);

  const handleAlign = async () => {
    const API_URL = process.env.REACT_APP_API_URL;

    const res = await fetch(`${API_URL}/align`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seq1, seq2 })
    });

    const data = await res.json();
    setMatrix(data.matrix);
    setScore(data.score);
  };

  return (
    <div className="container">
      <h1>Needleman-Wunsch Alignment</h1>

      <div className="inputs">
        <input
          placeholder="Sequence 1"
          value={seq1}
          onChange={(e) => setSeq1(e.target.value)}
        />
        <input
          placeholder="Sequence 2"
          value={seq2}
          onChange={(e) => setSeq2(e.target.value)}
        />
      </div>

      <button onClick={handleAlign}>Align</button>

      {score !== null && (
        <div className="result">
          <h2>Score: {score}</h2>

          <table>
            <tbody>
              {matrix.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;