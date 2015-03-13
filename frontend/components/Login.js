/*** @jsx React.DOM */

var React = require('react'),
    Router = require('react-router'),
    Fluxxor = require('fluxxor');

var Login = React.createClass({
  mixins: [Router.Navigation, Router.State, Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('AuthStore')],

  getStateFromFlux: function() {
    var auth = this.getFlux().store('AuthStore').getState();
    if (!!auth.user) {
      var nextPath = this.getQuery().nextPath;
      if (nextPath) this.transitionTo(nextPath);
      else this.replaceWith('/');
    }
    return {
      AuthStore: auth
    }
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;

    this.getFlux().actions.login(username, password);
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
