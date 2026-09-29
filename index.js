const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 10000;

const COUCHDB_URL = 'https://couchdb-3-gqmr.onrender.com/';
const BACKEND_URL = 'https://smart-meter-be.onrender.com';

async function pingUrl(name, url) {
  try {
    const response = await axios.get(url, {
      timeout: 10000,
    });

    console.log(
      `[${new Date().toISOString()}] ${name} Success: ${response.status}`
    );
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] ${name} Failed: ${error.message}`
    );
  }
}

// Initial ping
pingUrl('CouchDB', COUCHDB_URL);
pingUrl('Backend', BACKEND_URL);

// CouchDB every 1 minute
setInterval(() => {
  pingUrl('CouchDB', COUCHDB_URL);
}, 60 * 1000);

// Backend every 2 minutes
setInterval(() => {
  pingUrl('Backend', BACKEND_URL);
}, 2 * 60 * 1000);

app.get('/', (_, res) => {
  res.send('Keep Alive Service Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});