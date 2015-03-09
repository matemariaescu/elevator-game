/*** @jsx React.DOM */

var React = require('react');

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

exports = Leaderboard;
