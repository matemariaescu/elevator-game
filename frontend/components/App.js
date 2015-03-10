/*** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var App = React.createClass({
  render: function () {
    // <li><Link to="game" params={{level: "1"}}>Play!</Link></li>
    // <li><Link to="about">About</Link></li>
    return (
      <div>
        <h1>ElevatorOperator</h1>
        <ul>
          <li><Link to="leaderboard">Leaderboard</Link></li>
          <li><Link to="game" params={{level: "0"}}>Game</Link></li>
        </ul>
        <Router.RouteHandler/>
      </div>
    );
  }
});

module.exports = App;