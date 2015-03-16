/*** @jsx React.DOM */

var React = require('react'),
    Router = require('react-router'),
    Fluxxor = require('fluxxor'),

    Flux = require('../Flux'),
    constants = require('../constants'),
    Simulator = require('../Simulator');

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      var nextPath = transition.path;
      var auth = Flux.store('AuthStore').getState();
      if (!auth.isLoggedIn) {
        transition.redirect('/login',{},
          { 'nextPath' : nextPath });
      }
    }
  }
};

var Game = React.createClass({
  mixins: [Router.State, Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('OutputStore'), Authentication],

  //propTypes: {}, // TODO
  getInitialState: function() {
    return {
      level: parseInt(this.getParams().level),
      code: constants.initCode,
      state: 'stopped',
      simulator: null,
      result: null
    };
  },
  getStateFromFlux: function() {
    return {
      output: this.getFlux().store('OutputStore').getOutput()
    };
  },
  render: function() {
    return (
      <div className="game">
        <h1>ElevatorOperator</h1>
        <p>Level: {this.state.level}</p>
        <p>State: {this.state.state}</p>
        <p>Result: {this.state.result}</p>
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
    if (this.state.simulator !== null) return;

    Flux.actions.resetOutput();

    var userCode = eval('(' + this.state.code + ')');

    var simulator = new Simulator(userCode, this.state.level, function(data) {
      this.setState({simulator: null, state: 'done', result: data});
    }.bind(this));
    simulator.run();

    this.setState({simulator: simulator, state: 'running'});

  },
  _onStopClicked: function(event) {
    if (this.state.simulator === null) return;
    this.state.simulator.stop();
    this.setState({simulator: null, state: 'stopped'});
  }
});

module.exports = Game;
