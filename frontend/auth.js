/*** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var request = require('superagent');

var putLocal = function(key, value) {
  localStorage[key] = JSON.stringify(value);
};
var getLocal = function(key) {
  if (!localStorage[key]) return undefined;
  return JSON.parse(localStorage[key]);
};
var auth = {
  login: function (username, password, cb) {
    if (getLocal('user')) {
      if (cb) cb(getLocal('user'));
      this.onChange(getLocal('user'));
      return;
    }
    if (!username || !password) {
      if (cb) cb();
      this.onChange();
      return;
    }
    request
      .post('/auth/signin')
      .send({username: username, password: password})
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err || res.body.error) {
          if (cb) cb();
          this.onChange();
        }
        else {
          putLocal('user', res.body);
          if (cb) cb(res.body);
          this.onChange(res.body);
        }
      }.bind(this));
  },

  getUser: function () {
    return getLocal('user');
  },

  logout: function (cb) {
    delete localStorage.user;
    request
      .get('/auth/signout')
      .end(function(err, res) {
        if (cb) cb();
        this.onChange();
      }.bind(this));
  },

  loggedIn: function () {
    return !!localStorage.user;
  },

  onChange: function () {}
};

module.exports = auth;

