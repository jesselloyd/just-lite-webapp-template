/** @module MessageHandler */
var config = require('../config');
var jwt = require('jsonwebtoken');

/**
 * Express middleware. All requests sent to a
 * protected endpoint prefixed with /api are
 * received by this message handler. An access token
 * should be included in all api requests. The token
 * can be sent either as the header x-access-token or
 * in the body in a JSON object as the key token, or
 * as a query parameter ?token=value
 * @function AuthenticationMessageHandler
 * @instance
 */
function AuthenticationMessageHandler(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
		jwt.verify(token, config.secret, (err, decodedToken) => {
			if (err) {
				if (err.name === 'TokenExpiredError')
				{
					return res.status(401).send('Token expired.');
				} else {
					return res.status(401).send('Failed to authenticate token.');
				}
			} else {
				req.token = decodedToken;
				next();
			}
		});

	} else {
		return res.status(401).send('No token provided.');
	}
}

module.exports = AuthenticationMessageHandler;