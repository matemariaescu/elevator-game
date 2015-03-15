
var Fluxxor = require('fluxxor'),

    constants = require('../constants');

var ActionTypes = constants.ActionTypes;

var OutputStore = Fluxxor.createStore({
  initialize: function() {
    this.output = '';

    this.bindActions(
      ActionTypes.OUTPUT_RESET, this.onReceiveReset,
      ActionTypes.OUTPUT_SEND, this.onReceiveOutput);
  },
  onReceiveReset: function(payload) {
    this.output = '';
    this.emit('change');
  },
  onReceiveOutput: function(payload) {
    this.output += '\n' + payload.output;
    this.emit('change');
  },
  getOutput: function() {
    return this.output;
  },

  reset: function() {
    this.output = '';
    this.emit('change');
  },
  output: function(ouput) {
    this.output += '\n' + output;
    this.emit('change');
  }
});

module.exports = OutputStore;
