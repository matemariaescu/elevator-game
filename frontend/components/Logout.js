/*** @jsx React.DOM */

var React = require('react'),
    Router = require('react-router'),
    Fluxxor = require('fluxxor');

var Logout = React.createClass({
  mixins: [Fluxxor.FluxMixin(React)],

  componentDidMount: function () {
    this.getFlux().actions.logout();
  },

  render: function () {
    return <p>You are now logged out</p>;
  }
});

module.exports = Logout;
