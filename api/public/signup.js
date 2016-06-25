var bcrypt = require('bcrypt');
const saltRounds = 10;
var express = require('express');
var router = express.Router();
var User = require('../../data/models/user');

router.post('/signup', (req, res) => {
	bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
		if (err) {
			console.log("Failed to hash password correctly.");
			console.log(err);
			return res.status(500).send('Failed to hash password correctly.');
		}
		
		var user = new User({
			email: req.body.email,
			username: req.body.username,
			passwordHash: hash
		});

		user.save((err) => {
			if (err) {
				console.log("Error saving user: ", err);
				return res.status(500).send("Error saving user to database.");
			} 

			return res.status(200).json({ user: user });
		});
	});
});

router.get('/test', (req, res) => {
	res.json("Test endpoint.");
});

module.exports = router;