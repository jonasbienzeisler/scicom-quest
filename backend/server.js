// server.js
const express     = require('express');
const helmet      = require('helmet');
const path        = require('path');
const fileService = require('./services/fileService'); // you must have readResults & appendResult

// Load static JSON configs
const questions   = require('./config/questions.json');
const reflections = require('./config/reflections.json');
const privacy     = require('./config/privacy.json');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json({ limit: '10kb' }));

// Serve built frontend
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Config endpoint
app.get('/api/config', (req, res) => {
  res.json({ questions, reflections, privacy });
});

// Submit answers (append or replace)
app.post('/api/submit', async (req, res) => {
  const { sessionId, answers, demo } = req.body;
  if (!sessionId || !answers) {
    return res.status(400).json({ error: 'Missing sessionId or answers' });
  }
  const record = {
    sessionId,
    timestamp: new Date().toISOString(),
    answers,
    demo: demo || {}
  };
  try {
    await fileService.appendResult(record);
    res.json({ status: 'ok', sessionId });
  } catch (err) {
    console.error('Write error:', err);
    res.status(500).json({ error: 'Save failed' });
  }
});

// New: GET all results, filter only the *last complete* per session
app.get('/api/results', async (req, res) => {
  try {
    const all = await fileService.readResults(); // should return an array of records
    // pick the latest *complete* submission per sessionId
    const latest = {};
    for (const rec of all) {
      // only consider submissions with at least one Likert answer
      const likert = rec.answers?.likert || {};
      if (Object.keys(likert).length === 0) continue;

      const prev = latest[rec.sessionId];
      if (!prev || new Date(rec.timestamp) > new Date(prev.timestamp)) {
        latest[rec.sessionId] = rec;
      }
    }
    res.json(Object.values(latest));
  } catch (err) {
    console.error('Read results error:', err);
    res.status(500).json({ error: 'Could not read results' });
  }
});

// Fallback for SPA routing
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



