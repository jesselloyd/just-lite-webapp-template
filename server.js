var express = require('express');
var app = express();
var spa = require('express-spa');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var database = require('./data/dbconnection');
var compression = require('compression');
var config = require('./config');

var port = process.env.PORT || 8081;

// database.connect();

app.use(compression());
app.set('secret', config.secret);
app.use(methodOverride('X-HTTP-Method-Override'));
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
var io = require('socket.io').listen(server);

io.on('connection', function(socket){
  console.log('a user connected');
});