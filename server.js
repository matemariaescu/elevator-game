'use strict';

var config = require('./config/config'),
	mongoose = require('mongoose');

var db = mongoose.connect(config.db);

var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('Application started on port ' + config.port);
