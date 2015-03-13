
module.exports = {
	initCode: [
		'{',
    	'stateUpdated: function(elevator, state) {',
    	'        if (elevator.floorQueue.length != 0) return;',
    	'        for (var i = 0; i < state.numFloors; i++) {',
    	'            elevator.goToFloor(i);',
    	'        }',
    	'    }',
    	'}'].join('\n'),
    levels: [
    	{
    		numFloors: 3,
    		events: [
    			{type: 'PERSON_ARRIVES', id: 0, fromFloor: 0, toFloor: 1},
    			{type: 'PERSON_ARRIVES', id: 1, fromFloor: 2, toFloor: 0},
    			{type: 'PERSON_ARRIVES', id: 2, fromFloor: 1, toFloor: 0},
                {type: 'PERSON_ARRIVES', id: 3, fromFloor: 2, toFloor: 2}
    		]
    	}
    ],

    ActionTypes: {
        RECEIVE_LEADERBOARD: 'RECEIVE_LEADERBOARD',
        LOGIN: 'LOGIN',
        LOGOUT: 'LOGOUT'
    }
}