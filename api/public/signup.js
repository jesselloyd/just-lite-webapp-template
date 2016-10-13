var express = require('express');
var router = express.Router();
var User = require('../../data/models/user');
var passport = require('passport');

router.post('/signup', passport.authenticate('local-signup'), function(req, res) {
	console.log('signed up!');
});

router.post('/postendpoint', function(req, res) {
    res.send('You got through bro-ski! You must be accessing this from our domain and therefore have the necessary XSRF. Well done!');
});

router.get('/test', (req, res) => {
	res.json("Test endpoint.");
});

module.exports = router;
