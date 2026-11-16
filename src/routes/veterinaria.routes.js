const router = require('express').Router();
const controller = require('../controllers/veterinaria.controller');

router.get('/', controller.get);

module.exports = router;
