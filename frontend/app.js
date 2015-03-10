/*** @jsx React.DOM */

var React = require('react'),
    Router = require('react-router');

var App = require('./components/App'),
    Game = require('./components/Game'),
    Leaderboard = require('./components/Leaderboard'),

    Auth = require('./auth');

window.React = React; // export for http://fb.me/react-devtools

var Route = Router.Route;


var routes = (
  <Route handler={App}>
    <Route name="login" handler={Auth.Login}/>
    <Route name="logout" handler={Auth.Logout}/>
    <Route name="leaderboard" handler={Leaderboard}/>
    <Route name="game" path="/game/:level" handler={Game}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('react'));
});

