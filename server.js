var express = require('express');
var app = express();
var spa = require('express-spa');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var database = require('./data/dbconnection');
var compression = require('compression');
var config = require('./config');
var passport = require('passport');
var csrf = require('csurf');
var helmet = require('helmet');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./data/models/user');
require('./passport-config')(passport);

var csrfProtection = csrf({cookie: {key: 'XSRF-TOKEN', secure: true}});

var requireAuthentication = function(req, res, next) {
  console.log('Checking auth... The session user value will be the ID of that user in the MongoDB AppUsers table');
  console.log("Session Details", req.session);
    if (!req.isAuthenticated()) {
      console.log('AUTH FAILED');
      res.sendStatus(401);
    }
    else {
      console.log('AUTH SUCCEEDED');
      next();
    }
};

var port = process.env.PORT || 8081;

database.connect();

app.use(compression());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());
app.set('secret', config.secret);
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: config.secret
}));
app.use(express.static(__dirname + "/client"));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', require('./api/public/routes'));
app.use(csrfProtection);
app.use('/api', requireAuthentication, require('./api/private/routes'));

app.use(spa(__dirname + "/client/index.html"));


var server = app.listen(port);
var io = require('socket.io').listen(server);

io.on('connection', function(socket){
  console.log('a user connected');
});
