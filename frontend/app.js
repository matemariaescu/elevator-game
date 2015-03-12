/*** @jsx React.DOM */

var React = require('react'),
    Router = require('react-router'),
    Fluxxor = require('fluxxor');

var App = require('./components/App'),
    Game = require('./components/Game'),
    Leaderboard = require('./components/Leaderboard'),
    Login = require('./components/Login'),
    Logout = require('./components/Logout');


window.React = React; // export for http://fb.me/react-devtools

var flux = new Fluxxor.Flux(require('./stores/stores'), require('./actions/actions'));
flux.on('dispatch', function(type, payload) {
  console.log('[Dispatch]', type, payload);
});


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
  React.render(<Handler flux={flux} />, document.getElementById('react'));
});

