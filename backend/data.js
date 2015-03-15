'use strict';

exports.levels = [
	{
		numFloors: 3,
		maxElevatorCapacity: 5,
		people: [
			[{fromFloor: 0, toFloor: 1},
			 {id: 1, fromFloor: 2, toFloor: 0}],
			[{fromFloor: 1, toFloor: 0}],
            [{fromFloor: 2, toFloor: 2}]
		]
	}
];