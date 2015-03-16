
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
    	'        if (elevator.floorQueue.length !== 0) return;',
    	'        for (var i = 1; i < state.floors.length; i++) {',
    	'            elevator.goToFloor(i);',
    	'        }',
        '        elevator.goToFloor(0);',
    	'    }',
    	'}'].join('\n'),

    ActionTypes: typeListToObject([
        'RECEIVE_LEADERBOARD',

        'LOGIN',
        'LOGOUT',

        'OUTPUT_RESET',
        'OUTPUT_SEND'
    ])
}