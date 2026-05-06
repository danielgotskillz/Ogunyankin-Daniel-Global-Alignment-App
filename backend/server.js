const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

function needlemanWunsch(seq1, seq2, match = 1, mismatch = -1, gap = -2) {
  const m = seq1.length;
  const n = seq2.length;

  const matrix = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) matrix[i][0] = i * gap;
  for (let j = 0; j <= n; j++) matrix[0][j] = j * gap;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const diag = matrix[i - 1][j - 1] + (seq1[i - 1] === seq2[j - 1] ? match : mismatch);
      const up = matrix[i - 1][j] + gap;
      const left = matrix[i][j - 1] + gap;

      matrix[i][j] = Math.max(diag, up, left);
    }
  }

  return {
    matrix,
    score: matrix[m][n]
  };
}

app.get('/', (req, res) => {
  res.send('Needleman-Wunsch API is running 🚀');
});

app.post('/align', (req, res) => {
  const { seq1, seq2 } = req.body;

  if (!seq1 || !seq2) {
    return res.status(400).json({ error: "Both sequences are required" });
  }

  const result = needlemanWunsch(seq1, seq2);
  res.json(result);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
