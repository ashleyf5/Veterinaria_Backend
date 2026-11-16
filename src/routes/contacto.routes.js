const router = require('express').Router();
const { body } = require('express-validator');
const controller = require('../controllers/contacto.controller');
const { validateRequest } = require('../middleware/validation.middleware');

router.post(
  '/',
  [
    body('nombre').trim().isLength({ min: 2, max: 150 }),
    body('correo').trim().isEmail().isLength({ max: 150 }).normalizeEmail(),
    body('telefono').optional({ values: 'falsy' }).trim().isLength({ max: 30 }),
    body('asunto').trim().isLength({ min: 2, max: 200 }),
    body('mensaje').trim().isLength({ min: 10, max: 5000 }),
    validateRequest
  ],
  controller.create
);

module.exports = router;
