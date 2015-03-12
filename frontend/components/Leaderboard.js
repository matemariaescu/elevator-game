/*** @jsx React.DOM */

var React = require('react'),
    Fluxxor = require('fluxxor'),
    Socket = require('../Socket');

var Leaderboard = React.createClass({
  mixins: [Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('LeaderboardStore')],
  getStateFromFlux: function() {
    return {
      leaderboard: this.getFlux().store('LeaderboardStore').getState()
    };
  },

  _socketCallback: function(leaderboard) {
    console.log(leaderboard);
    this.getFlux().actions.receiveLeaderboard(leaderboard);
  },
  componentDidMount: function() {
    console.log('MOUNTED');
    Socket.on('leaderboard', this._socketCallback);
  },
  componentWillUnmount: function() {
    Socket.removeListener('leaderboard', this._socketCallback);
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
