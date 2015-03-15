
var typeListToObject = function(l) {
    var res = {};
    for (var i = 0; i < l.length; i++) {
        var v = l[i];
        res[v] = v;
    }
    return res;
};

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
    			[{type: 'PERSON_ARRIVES', id: 0, fromFloor: 0, toFloor: 1},
    			 {type: 'PERSON_ARRIVES', id: 1, fromFloor: 2, toFloor: 0}],
    			[{type: 'PERSON_ARRIVES', id: 2, fromFloor: 1, toFloor: 0}],
                [{type: 'PERSON_ARRIVES', id: 3, fromFloor: 2, toFloor: 2}]
    		]
    	}
    ],

    ActionTypes: typeListToObject([
        'RECEIVE_LEADERBOARD',

        'LOGIN',
        'LOGOUT',

        'OUTPUT_RESET',
        'OUTPUT_SEND',

        'START_NEW_GAME',
        'ELEVATOR_REACHES_FLOOR',
        'PERSON_ARRIVES'
    ])
}