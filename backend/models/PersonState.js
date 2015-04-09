'use strict';

function PersonState (floor, time, dest) {
  this.floor = floor;
  this.time = time;
  this.status = 0;
  // -1 if not waiting yet
  // 0 if waiting
  // 1000 if delivered
  // x if in elevator x
  this.dest = dest;
  this.score = 1;
};

PersonState.prototype.toFlood = function () {
  return this.floor;
};

PersonState.prototype.isWaiting = function () {
  if  (status == 0) return true;
  else return false;
};

PersonState.prototype.isInElevator = function () {
  if (status < 1000 && status > 0) return true;
  else return false;
};

PersonState.prototype.getScore = function () {
  if (status == 1000) return score;
  else return 0;
};

PersonState.prototype.modifyScore = function (offTime) {
  // do nothing for now
};

PersonState.prototype.getOnElevator = function (elevator) {
  this.status = elevator.getId;
};

PersonState.prototype.getToDestination = function (offTime) {
  // just call with 0 for now
  this.status = 1000;
  this.modifyScore(offTime);
};

module.exports = PersonState;
