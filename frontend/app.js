/*** @jsx React.DOM */

var React = require('react'),
    Router = require('react-router');

var App = require('./components/App'),
    Game = require('./components/Game'),
    Leaderboard = require('./components/Leaderboard'),
    Login = require('./components/Login'),
    Logout = require('./components/Logout');


window.React = React; // export for http://fb.me/react-devtools

var Route = Router.Route;


var routes = (
  <Route handler={App}>
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="leaderboard" handler={Leaderboard}/>
    <Route name="game" path="/game/:level" handler={Game}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('react'));
});

