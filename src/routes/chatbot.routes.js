const router = require('express').Router();
const { body } = require('express-validator');
const controller = require('../controllers/chatbot.controller');
const { validateRequest } = require('../middleware/validation.middleware');

router.get('/health', controller.health);
router.post(
  '/message',
  [
    body('message').isString().trim().isLength({ min: 1, max: 1000 }),
    body('history').optional().isArray({ max: 8 }),
    body('history.*').isObject(),
    body('history.*.role').isIn(['user', 'assistant']),
    body('history.*.content').isString().trim().isLength({ min: 1, max: 1000 }),
    validateRequest
  ],
  controller.message
);

module.exports = router;
