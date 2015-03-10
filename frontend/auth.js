/*** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

/*var auth = {
  login: function (email, password, cb) {
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }
    $.post('/auth/signin', {username: email, password: password},
      function(data) {
        if (data.error) cb(data)
      }
    );

    pretendRequest(email, pass, function (res) {
      if (res.authenticated) {
        localStorage.token = res.token;
        if (cb) cb(true);
        this.onChange(true);
      } else {
        if (cb) cb(false);
        this.onChange(false);
      }
    }.bind(this));
  },

  getToken: function () {
    return localStorage.token;
  },

  logout: function (cb) {
    delete localStorage.token;
    if (cb) cb();
    this.onChange(false);
  },

  loggedIn: function () {
    return !!localStorage.token;
  },

  onChange: function () {}
};

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
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    auth.login(email, password, function (loggedIn) {
      if (!loggedIn)
        return this.setState({ error: true });

      if (nextPath) {
        this.transitionTo(nextPath);
      } else {
        this.replaceWith('/about');
      }
    }.bind(this));
  },

  render: function () {
    var errors = this.state.error ? <p>Bad login information</p> : '';
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input type="email" ref="email" placeholder="email"/></label>
        <label><input type="password" ref="password" placeholder="password"/></label><br/>
        <button type="submit">login</button>
        {errors}
      </form>
    );
  }
});

var Logout = React.createClass({
  componentDidMount: function () {
    auth.logout();
  },

  render: function () {
    return <p>You are now logged out</p>;
  }
});

module.exports = {
  Login: Login,
  Logout: Logout
};*/
