const router = require('express').Router();
const { param } = require('express-validator');
const controller = require('../controllers/precio.controller');
const { validateRequest } = require('../middleware/validation.middleware');

router.get('/', controller.list);
router.get('/:servicioId', [param('servicioId').isInt({ min: 1 }), validateRequest], controller.getByService);

module.exports = router;
