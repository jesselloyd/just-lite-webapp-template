var express = require('express');
var router = express.Router();

router.get('/users', (req, res, next) => {
	res.send("Users endpoint.");
});

module.exports = router;
