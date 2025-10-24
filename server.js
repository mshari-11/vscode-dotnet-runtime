const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'reports.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) || {};
  } catch (e) {
    return {};
  }
}
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.post('/report', (req, res) => {
  const body = req.body || {};
  const id = String(body.id || 'unknown');
  const lat = Number(body.lat);
  const lng = Number(body.lng);
  const accuracy = body.accuracy;
  const ts = body.timestamp || Date.now();
  if (isNaN(lat) || isNaN(lng)) {
    return res.status(400).json({ error: 'invalid coordinates' });
  }

  const record = {
    lat, lng, accuracy, timestamp: ts, userAgent: req.headers['user-agent'] || '', ip: req.ip
  };

  const data = readData();
  data[id] = data[id] || [];
  data[id].push(record);
  writeData(data);

  console.log('Received report for', id, record);
  res.json({ ok: true });
});

app.get('/api/latest/:id', (req, res) => {
  const id = String(req.params.id || 'unknown');
  const data = readData();
  const list = data[id] || [];
  const latest = list.length ? list[list.length - 1] : null;
  res.json({ id, latest, count: list.length });
});

app.get('/api/latest', (req, res) => {
  // allow query param ?id=...
  const id = String(req.query.id || 'unknown');
  const data = readData();
  const list = data[id] || [];
  const latest = list.length ? list[list.length - 1] : null;
  res.json({ id, latest, count: list.length });
});

// simple health
app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
