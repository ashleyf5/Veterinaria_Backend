const { createReply, checkOllama } = require('../services/ollama.service');
const { getAssistantContext } = require('../services/veterinary.service');
const { createSystemPrompt } = require('../chatbot/chatbot.prompt');
const { success } = require('../utils/responses');

async function message(req, res) {
  const context = await getAssistantContext();
  const history = Array.isArray(req.body.history) ? req.body.history.slice(-8) : [];
  const messages = [
    { role: 'system', content: createSystemPrompt(context) },
    ...history.map(({ role, content }) => ({ role, content })),
    { role: 'user', content: req.body.message.trim() }
  ];
  const reply = await createReply(messages);
  if (!reply || !reply.trim()) {
    const error = new Error('Ollama devolvió una respuesta vacía.');
    error.status = 503;
    throw error;
  }
  return success(res, { reply });
}

async function health(req, res) {
  const status = await checkOllama();
  return res.status(status.available ? 200 : 503)
    .json({ success: status.available, data: status });
}

module.exports = { message, health };
