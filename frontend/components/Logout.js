/*** @jsx React.DOM */

var React = require('react'),
    Router = require('react-router'),

    auth = require('../auth');

var Logout = React.createClass({
  componentDidMount: function () {
    auth.logout();
  },

  render: function () {
    return <p>You are now logged out</p>;
  }
});

module.exports = Logout;
