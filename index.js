const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 10000;

const COUCHDB_URL = 'https://couchdb-3-gqmr.onrender.com/';

async function pingCouchDB() {
  try {
    const response = await axios.get(COUCHDB_URL, {
      timeout: 10000,
    });

    console.log(
      `[${new Date().toISOString()}] Success: ${response.status}`
    );
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Failed:`,
      error.message
    );
  }
}

// Initial ping
pingCouchDB();

// Ping every minute
setInterval(pingCouchDB, 60 * 1000);

app.get('/', (_, res) => {
  res.send('Keep Alive Service Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});