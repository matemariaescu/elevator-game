'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');


var UserSchema = new Schema({
	/*email: {
		type: String,
		trim: true,
		unique: true,
		default: '',
		match: [/.+\@.+\..+/, 'email adress not valid']
	},*/
	username: {
		type: String,
		unique: true,
		required: 'username required',
		trim: true
	},
	password: {
		type: String,
		default: '',
		validate: [function(password) {
			return password && password.length >= 6;
		}, 'password too short (minimum length: 6)']
	},
	salt: {
		type: String
	},

	created: {
		type: Date,
		default: Date.now
	}
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length >= 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

mongoose.model('User', UserSchema);
