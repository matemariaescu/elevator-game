'use strict';

var mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

var removeSensitiveUserData = function(user) {
	user.password = undefined;
	user.salt = undefined;

	return user;
};

exports.signup = function(req, res) {
	var user = new User(req.body);
	var message = null;

	user.save(function(err) {
		if (err) {
			return res.status(400).jsonp({
				message: err
			});
		} else {
			user = removeSensitiveUserData(user);

			req.login(user, function(err) {
				if (err) {
					res.status(400).jsonp(err);
				} else {
					res.status(200).jsonp(user);
				}
			});
		}
	});
};

exports.signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.status(400).jsonp(info);
		} else {
			user = removeSensitiveUserData(user);

			req.login(user, function(err) {
				if (err) {
					res.status(400).jsonp(err);
				} else {
					res.status(200).jsonp(user);
				}
			});
		}
	})(req, res, next);
};


exports.signout = function(req, res) {
	req.logout();
	res.status(200).jsonp({
		message: 'signed out'
	});
};

exports.me = function(req, res) {
	res.status(200).jsonp(req.user || null);
};

exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(400).jsonp({
			error: 'not logged in'
		});
	}

	next();
};

