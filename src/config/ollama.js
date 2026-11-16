const axios = require('axios');

const ollama = axios.create({
  baseURL: process.env.OLLAMA_URL || 'http://localhost:11434',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' }
});

module.exports = { ollama };
