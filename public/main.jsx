var Router = ReactRounter
var { Route, RouteHandler, Link } = Router;

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Elevator Game</h1>
        <ul>
          <li><Link to="game" params={{level: "1"}}>Play!</Link></li>
          <li><Link to="about">About</Link></li>
          <li><Link to="leaderboard">Leaderboard</Link></li>
        </ul>
        <RouteHandler/>
      </div>
    );
  }
});

var About = React.createClass({
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
});

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};

var Leaderboard = React.createClass({
  mixins: [SetIntervalMixin],
  loadLeaderboardFromServer: function() {
    $.ajax({
      url: 'leaderboard',
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    this.loadLeaderboardFromServer();
    this.setInterval(this.loadLeaderboardFromServer, 2000);
  },
  render: function() {
    var rows = this.state.data.sort(function(l, r) {
      return l.points < r.points;
    }).map(function(person) {
      return (
        <tr>
          <td>{person.name}</td>
          <td>{person.points}</td>
        </tr>
      );
    })
    return (
      <div className="leaderboard">
        <h3>Leaderboard</h3>
        <table>
          {rows}
        </table>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route name="game" path="game/:level" handler={Game}/>
    <Route name="leaderboard" handler={Leaderboard}/>
    <Route name="about" handler={About}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
