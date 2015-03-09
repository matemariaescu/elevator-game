'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	fs = require('fs'),
	cookieParser = require('cookie-parser'),
	helmet = require('helmet'),
	passport = require('passport'),
	mongoStore = require('connect-mongo')(session),
	config = require('./config');

module.exports = function(db) {
	// Initialize express app
	var app = express();

	// Require models
	fs.readdirSync('./app/models').forEach(function(file) {
	  require('../app/models/' + file);
	});

	// Showing stack errors
	app.set('showStackError', true);

	// Bodyparser
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	// Enable jsonp
	app.enable('jsonp callback');

	// CookieParser should be above session
	app.use(cookieParser());

	// Express MongoDB session storage
	app.use(session({
		secret: config.sessionSecret,
		store: new mongoStore({
			mongooseConnection: db.connection,
			collection: 'sessions',
			autoReconnect: true
		}),
		resave: true,
    	saveUninitialized: true
	}));

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());

	// Use helmet to secure Express headers
	app.use(helmet());

	app.disable('x-powered-by');


	// Setting the app router and static folder
	app.use(express.static(__dirname + '/../public'));

	require('../app/routes.js')(app);


	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		res.status(500).jsonp({
			error: err.stack
		});
	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		res.status(404).jsonp({
			error: '404'
		});
	});

	return app;
};
