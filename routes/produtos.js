var express = require('express');
var router = express.Router();
const controller = require('../controllers/produtos');

/* GET home page. */
router.get('/', controller.list);
router.get('/:id', controller.find);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
