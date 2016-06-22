var prompt = require('prompt');
var database = require('./data/dbconnection');
var compression = require('compression');
var express = require('express');
var spa = require('express-spa');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./config');

var port = process.env.PORT || 8081;

app.use(compression());
app.set('secret', config.secret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/client"));

app.get('/docs', (req, res, next) => {
	res.sendFile('index.html', {root: __dirname + '/client/docs'});
});

app.use(spa(__dirname + "/client/index.html"));

// register routes
app.use('/', require('./api/public/routes'));
app.use('/api', require('./middleware/authentication'));
app.use('/api', require('./api/private/routes'));

var server = app.listen(port);

