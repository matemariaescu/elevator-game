/*** @jsx React.DOM */

var React = require('react'),
    Router = require('react-router'),
    constants = require('../constants'),
    Simulator = require('../simulator');

var Game = React.createClass({
  mixins: [ Router.State ],
  getInitialState: function() {
    return {
      level: this.getParams().level,
      code: constants.initCode,
      output: '',
      state: 'stopped',
      simulator: null
    };
  },
  render: function() {
    return (
      <div className="game">
        <h1>ElevatorOperator</h1>
        <p>Level: {this.state.level}</p>
        <p>State: {this.state.state}</p>
        <textarea
          className="code-textarea"
          ref="codeInput"
          value={this.state.code}
          onChange={this._onCodeChange} />
        <textarea
          className="output-textarea"
          ref="output"
          readOnly="true"
          value={this.state.output} />
        <br/>
        <button
          className="run-button"
          onClick={this._onRunClicked}>RUN</button>
        <button
          className="stop-button"
          onClick={this._onStopClicked}>STOP</button>
      </div>
    );
  },
  _onCodeChange: function(event) {
    this.setState({code: this.refs.codeInput.getDOMNode().value});
  },
  _onRunClicked: function(event) {
    if (this.state.simulator != null) return;

    this.setState({output: ''});

    var userCode = eval('(' + this.state.code + ')');

    var simulator = new Simulator(userCode, this.state.level, function(message) {
      var output = this.state.output;
      this.setState({output: output + message + '\n'});
    }.bind(this), function() {
      this.setState({simulator: null});
    }.bind(this));
    simulator.run();

    this.setState({simulator: simulator, state: 'running'});

  },
  _onStopClicked: function(event) {
    if (this.state.simulator == null) return;
    this.state.simulator.stop();
    this.setState({simulator: null, state: 'stopped'});
  }
});

module.exports = Game;
