/*** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var Leaderboard = require('./leaderboard');

var Link = Router.Link;

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Elevator Game</h1>
        <ul>
          // <li><Link to="game" params={{level: "1"}}>Play!</Link></li>
          // <li><Link to="about">About</Link></li>
          <li><Link to="leaderboard">Leaderboard</Link></li>
        </ul>
        <Router.RouteHandler/>
      </div>
    );
  }
});

exports = App;