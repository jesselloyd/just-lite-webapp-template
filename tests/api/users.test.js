var request = require('supertest');
var express = require('express');
var expect = require('expect');
var app = express();

app.get('/user', (req, res) => {
	res.status(200).json({test: "This is a test man!"});
});
app.use('/', require('../../api/public/routes'));
app.use('/api', require('../../middleware/authentication'));
app.use('/api', require('../../api/private/routes'));

describe('GET /user', () => {
	it('should respond with json', (done) => {
		request(app)
		.get('/user')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.end((err, res) => {
			if (err) return err;
			done();
		});
	});
});