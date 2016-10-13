// test endpoint. users should not be able to get to this without first authenticating
// with both a valid CSRF token and a secure HttpOnly cookie set with Passport

var express = require('express');
var router = express.Router();

router.get('/private', function(req, res, next) {
    console.log('inside private private function.');
    res.sendStatus(200);
})

module.exports = router;
