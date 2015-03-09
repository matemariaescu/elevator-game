'use strict';

module.exports = function(app) {
	var users = require('./controllers/users'); 

	app.route('/auth/signup').post(users.signup);
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);

	app.route('/users/me').get(users.me);

	app.route('/private').get(users.requiresLogin, function(req, res) {
		res.jsonp({
			message: 'logged in!!!!'
		});
	});

	app.get('/leaderboard', function(req, res) {
		res.jsonp([
			{name: 'Lukas', points: 900},
			{name: 'John', points: 1000},
			{name: 'Mike', points: 200}
		]);
	});

};
