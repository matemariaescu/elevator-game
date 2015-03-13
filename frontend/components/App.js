/*** @jsx React.DOM */

var React = require('react'),
    Router = require('react-router'),
    Fluxxor = require('fluxxor');

var Link = Router.Link;



var App = React.createClass({
  mixins: [Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('AuthStore')],

  getStateFromFlux: function() {
    return {
      AuthStore: this.getFlux().store('AuthStore').getState()
    }
  },

  render: function () {
    var loginOrOut = this.state.AuthStore.isLoggedIn ?
      <span><Link to="logout">logout</Link> {JSON.stringify(this.state.AuthStore.user)}</span> :
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