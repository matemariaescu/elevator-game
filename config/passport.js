'use strict';

var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');

module.exports = function() {
	// Serialize sessions
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// Deserialize sessions
	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}, '-salt -password', function(err, user) {
			done(err, user);
		});
	});

	// Initialize strategy
	passport.use(new LocalStrategy(
		function(username, password, done) {
			User.findOne({
				username: username
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: 'Unknown user'
					});
				}
				if (!user.authenticate(password)) {
					return done(null, false, {
						message: 'Invalid password'
					});
				}

				return done(null, user);
			});
		}
	));
};
