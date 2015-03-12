/*** @jsx React.DOM */

var React = require('react'),
    ActionCreator = require('../ActionCreator'),
    Socket = require('../Socket'),
    LeaderboardStore = require('../stores/LeaderboardStore');

var Leaderboard = React.createClass({
  getInitialState: function() {
    return {
      leaderboard: []
    };
  },
  _socketCallback: function(leaderboard) {
    console.log(leaderboard);
    ActionCreator.receiveLeaderboard(leaderboard);
  },
  componentDidMount: function() {
    console.log('MOUNTED');
    Socket.on('leaderboard', this._socketCallback);
    LeaderboardStore.on('change', this._onChange);
  },
  componentWillUnmount: function() {
    LeaderboardStore.removeListener('change', this._onChange);
    Socket.removeListener('leaderboard', this._socketCallback);
  },
  _onChange: function() {
    console.log('_onChange');
    this.setState({leaderboard: LeaderboardStore.get()});
  },
  render: function() {
    var rows = this.state.leaderboard.sort(function(l, r) {
      return l.points < r.points ? 1 : -1;
    }).map(function(person) {
      return (
        <tr key={person.id}>
          <td>{person.username}</td>
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

module.exports = Leaderboard;
