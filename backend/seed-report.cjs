const http = require('http');

const data = JSON.stringify({
  educationLevel: 'high_school',
  responses: { '1': 'a' },
  traitScores: { planning: 5, communication: 3, 'learning style': 6 }
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/assessment/submit',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let chunks = '';
  res.on('data', d => chunks += d);
  res.on('end', () => console.log('Response:', chunks));
});

req.on('error', error => console.error(error));
req.write(data);
req.end();
