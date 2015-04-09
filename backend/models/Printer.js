'use strict';

function Printer (gameState) {
  this.gameState = gameState;
  this.floorHeight = 500;
};


Printer.prototype.getString = function() {
  var n = this.gameState.getData.floors.length;
  var i = 0;
  var res = "";
  for (i = 0; i< n; i++) res = res.concat(this.getFloorString(i));
  return res;
};

Printer.prototype.getFloorString = function(floor) {
  var i = 0;
  var res = "";
  var sol = getFloor(floor);
  for (i=0; i<this.floorHeight; i++) {
    res = res.concat(sol[i]);
    res = res.concat("\n");
  };
  return res;
};

Printer.prototype.getFloorString = function(floor){
  var res = [];
  // stuff; will collate the ASCII art from the defined drawings.
  return res;
};

Printer.prototype.redraw = function() {
  var result = this.getString;
  // do the printing of result.
};

module.exports - Printer;
