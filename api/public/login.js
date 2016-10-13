var express = require('express');
var router = express.Router();
var User = require('../../data/models/user');
var passport = require('passport');

router.post('/login', passport.authenticate('local-login'), function(req, res) {
    console.log('logged in!');
    res.send(req.user);
});

router.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : false);
});

router.post('/logout', function(req, res) {
    req.logOut();
    res.clearCookie('connect.sid');
    res.clearCookie('XSRF-TOKEN');
    res.sendStatus(200);
});

module.exports = router;
