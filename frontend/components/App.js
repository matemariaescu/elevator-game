/*** @jsx React.DOM */

var React = require('react'),
    Router = require('react-router'),

    auth = require('../auth');

var Link = Router.Link;

var App = React.createClass({
  getInitialState: function () {
    return {
      user: auth.getUser()
    };
  },

  setStateOnAuth: function (user) {
    this.setState({
      user: user
    });
  },

  componentWillMount: function () {
    auth.onChange = this.setStateOnAuth;
    auth.login();
  },


  render: function () {
    var loginOrOut = this.state.user ?
      <Link to="logout">logout</Link> :
      <Link to="login">login</Link>;
    return (
      <div>
        <h1>ElevatorOperator</h1>
        <ul>
          <li>{loginOrOut}</li>
          <li><Link to="leaderboard">Leaderboard</Link></li>
          <li><Link to="game" params={{level: "0"}}>Game</Link> (authentication required)</li>
        </ul>
        <Router.RouteHandler/>
      </div>
    );
  }
});

module.exports = App;