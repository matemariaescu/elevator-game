/*** @jsx React.DOM */

var React = require('react'),
    Router = require('react-router'),

    auth = require('../auth');

var Login = React.createClass({
  mixins: [Router.Navigation, Router.State],

  getInitialState: function () {
    return {
      error: false
    };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var nextPath = this.getQuery().nextPath;
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    auth.login(username, password, function (user) {
      if (!user)
        return this.setState({ error: true });

      if (nextPath) {
        this.transitionTo(nextPath);
      } else {
        this.replaceWith('/');
      }
    }.bind(this));
  },

  render: function () {
    var errors = this.state.error ? <p>Bad login information</p> : '';
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input type="text" ref="username" placeholder="username"/></label>
        <label><input type="password" ref="password" placeholder="password"/></label><br/>
        <button type="submit">login</button>
        {errors}
      </form>
    );
  }
});

module.exports = Login;
