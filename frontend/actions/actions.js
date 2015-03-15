var constants = require('../constants');

var ActionTypes = constants.ActionTypes;

module.exports = {
	receiveLeaderboard: function(leaderboard) {
    this.dispatch(ActionTypes.RECEIVE_LEADERBOARD, leaderboard);
	},

	login: function(username, password) {
		this.dispatch(ActionTypes.LOGIN, {
			username: username,
			password: password
		});
	},
	logout: function() {
		this.dispatch(ActionTypes.LOGOUT, {});
	},

  resetOutput: function() {
    this.dispatch(ActionTypes.OUTPUT_RESET, {});
  },
  output: function(output) {
    this.dispatch(ActionTypes.OUTPUT_SEND, {
      output: output
    });
  },

  startNewGame: function(numFloors) {
    this.dispatch(ActionTypes.START_NEW_GAME, {
      numFloors: numFloors
    });
  },
  elevatorReachesFloor: function(floor, elevator) {
    this.dispatch(ActionTypes.ELEVATOR_REACHES_FLOOR, {
      floor: floor,
      elevator: elevator
    });
  },
  peopleEnterElevator: function(people) {
    this.dispatch(ActionTypes.PEOPLE_ENTER_ELEVATOR, {
      people: people
    });
  },
  personArrives: function(person) {
    this.dispatch(ActionTypes.PERSON_ARRIVES, {
      person: person
    });
  }
}