/** @module Authentication */
var config = require('../../config');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var express = require('express');
var router = express.Router();
var User = require('../../data/models/user');
var jwt = require('jsonwebtoken');

/**
 * Express middleware. Returns an access token if
 * a user provides a valid username and password
 * in an HTTP GET request. Include the token in all
 * requests made to /api endpoints for permission
 * to access each resource. The token can be sent
 * either as the header x-access-token or in the
 * body in a JSON object as the key token, or
 * as a query parameter ?token=value
 * @function Authenticate
 * @instance
 */
router.post('/authenticate', (req, res) => {
	User.findOne({
		username: req.body.username
	}, (err, user) => {
		if (err) {
			console.log("Error finding user in database.");
			return res.status(500).send("Error locating user in database.");
		} 
		if (!user) {
			console.log(req.body.username);
			return res.status(401).send('Authentication failed. No user with this name');
		}

		bcrypt.compare(req.body.password, user.passwordHash, (err, verified) => {
			if (err) {
				return res.status(500).send('Error comparing password to passwordHash.');
			}

			if (!verified) {
				return res.status(401).send('Authentication failed. Wrong password.');
			} 

			var userModel = {
				_id: user._id,
				email: user.email,
			};

			var token = jwt.sign(userModel, config.secret, { expiresIn: '24h' });

			return res.status(200).json({ token: token });
		});
	});
});

module.exports = router;