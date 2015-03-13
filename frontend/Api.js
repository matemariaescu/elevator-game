
var request = require('superagent');

var login = function(username, password, cb) {
	request
        .post('/auth/signin')
        .send({username: username, password: password})
        .set('Accept', 'application/json')
        .end(cb);
};
var logout = function(cb) {
	request
        .get('/auth/signout')
        .end(cb);  
};

module.exports = {
	login: login,
	logout: logout
};
