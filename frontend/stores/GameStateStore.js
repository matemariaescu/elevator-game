
var Fluxxor = require('fluxxor'),
    Flux = require('../Flux'),

    constants = require('../constants');

var ActionTypes = constants.ActionTypes;

var GameStateStore = Fluxxor.createStore({
  initialize: function() {
    this.floors = [];

    this.bindActions(
      ActionTypes.START_NEW_GAME, this.onStartNewGame,
      ActionTypes.ELEVATOR_REACHES_FLOOR, this.onElevatorReachesFloor,
      ActionTypes.PERSON_ARRIVES, this.onPersonArrives);
  },
  onStartNewGame: function(payload) {
    this.floors = [];
    for (var i = 0; i < payload.numFloors; i++) {
      this.floors.push([]);
    }
    this.emit('change');
  },
  onPersonArrives: function(payload) {
    var person = payload.person;
    this.floors[person.fromFloor].push(person);
    this.emit('change');
  },
  onElevatorReachesFloor: function(payload) {
    payload.elevator.peopleEnter(this.floors[floor]);
    this.floors[floor] = [];
    this.emit('change');
  },

  getState: function() {
    return {
      numFloors: this.floors.length,
      floors: this.floors
    };
  }
});

module.exports = GameStateStore;
