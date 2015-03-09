/*** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var App = require('./app');

var Route = Router.Route;

var routes = (
  <Route handler={App}>
    /*<Route name="game" path="game/:level" handler={Game}/>*/
    <Route name="leaderboard" handler={Leaderboard}/>
    //<Route name="about" handler={About}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

/*var About = React.createClass({
  render: function () {
    return (
      <div>
        <h3>About</h3>
      </div>
    );
  }
});

var Game = React.createClass({
  mixins: [ Router.State ],

  getInitialState: function() {
    return {
      data: []
    };
  },

  render: function() {
    var level = this.getParams().level;

    return (
      <div>
        <h3>Game</h3>
        You're in level {level}
      </div>
    );
  }
});*/




