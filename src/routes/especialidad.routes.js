const router = require('express').Router();
const { param } = require('express-validator');
const controller = require('../controllers/especialidad.controller');
const { validateRequest } = require('../middleware/validation.middleware');

router.get('/', controller.list);
router.get('/:id', [param('id').isInt({ min: 1 }), validateRequest], controller.get);

module.exports = router;
