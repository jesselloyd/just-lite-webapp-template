var express = require('express');
var router = express.Router();

router.use(require('./users'));
router.use(require('./private'));

module.exports = router;
