'use strict';

module.exports = {
	db: process.env.MONGOLAB_URI || 'mongodb://localhost/elevator',
	sessionSecret: 'blablabla',
	port: process.env.PORT || 3333
}
