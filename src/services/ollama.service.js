const { ollama } = require('../config/ollama');

async function createReply(messages) {
  try {
    const response = await ollama.post('/api/chat', {
      model: process.env.OLLAMA_MODEL || 'gemma3:4b',
      messages,
      stream: false
    });
    return response.data.message?.content;
  } catch (error) {
    error.status = 503;
    throw error;
  }
}

async function checkOllama() {
  const modelName = process.env.OLLAMA_MODEL || 'gemma3:4b';
  try {
    const response = await ollama.get('/api/tags');
    const available = (response.data.models || []).some(
      (model) => model.name === modelName || model.name.startsWith(`${modelName}:`)
        || (modelName === 'gemma3' && model.name.startsWith('gemma3:'))
    );
    return { available, model: modelName };
  } catch {
    return { available: false, model: modelName };
  }
}

module.exports = { createReply, checkOllama };
