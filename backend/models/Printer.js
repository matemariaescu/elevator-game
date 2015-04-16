'use strict';

function Printer (socket, gameState) {
  this.socket = socket;
  this.gameState = gameState;
  this.floorWidth = 90;
  this.floorHeight = 14+1 + 3 + 1;
  this.floorInd  = [ "      .-------.     ",
                     "     /   000   \\    ",
                     "     ¯¯¯¯¯¯¯¯¯¯¯    "];
  this.digPos = [11, 10, 9];
  this.liftClose = [ "    _______________ ",
                     "   |  ___________  |",
                     "   | |     |     | |",
                     "   | |     |     | |",
                     "   | |     |     | |",
                     "   | |     |     | |",
                     "   | |     |     | |",
                     "   | |     |     | |",
                     "   | |     |     | |",
                     "   | |     |     | |",
                     "   |_|_____|_____|_|"];
    this.liftOpen = [ "    _______________ ",
                      "   |  ___________  |",
                      "   | | |         | |",
                      "   | | |         | |",
                      "   | | |         | |",
                      "   | | |         | |",
                      "   | | |         | |",
                      "   | | |         | |",
                      "   | | |_________| |",
                      "   | |/          | |",
                      "   |_|___________|_|"];
    this.floorChar = '▮';
    this.separChar = '=';
    this.wallChar = ' ';
    this.person = ["/¯¯\\",
                   "\\⍛⍛/"];  
    this.personIn = '☻'; // 9 - 6

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
    res += sol[i];
    res += "\n";
  };
  return res;
};

Printer.prototype.getFloor = function(floor){
  var res = [];
  var i = 0; 
  // Empty line.
  res.push(this.getLine(this.wallChar, this.floorWidth));
  // The indicators.
  res.push(this.getIndicators(this.gameState.getElevators, 0));
  res.push(this.getIndicators(this.gameState.getElevators, 1));
  res.push(this.getIndicators(this.gameState.getElevators, 2));
  // The elevators.
  for (i=0;i<11; i++)
    res.push(this.getLift(floor, this.gameState.getElevators,i));
  // The floor.
  res.push(this.getLine(this.floorChar, this.floorWidth));
  // The Queue of people waiting.
  res.push(this.getQueue(this.gameState.getPeopleOnFloor(floor),0, this.floorWidth));
  res.push(this.getQueue(this.gameState.getPeopleOnFloor(floor),1, this.floorWidth));
  // The Separator.
  res.push(this.getLine(this.separChar, this.floorWidth));
  return res;
};

Printer.prototype.getLine = function(character,repeats) {
  var res = "";
  var i = 0;
  for (i = 0; i< repeats; i++) {
    res+= character;
  }
  return res;
};

Printer.prototype.getLift = function (floor, elevators, line) {
  var res = "";
  var i = 0;
  var n = elevators.length;
  var m = 0;
  for (i = 0; i< n; i++) {
    if (elevators[i].isOnFloor(floor) && elevators[u].isDoorOpen) {
      if (line <6 || line > 7)
        res += this.liftOpen[line];
      else {
        m = elevators[i].getPeopleInElevator;
        if (line == 6) {
          m -= 6;
          if (m <0 )
            m = 0;
        }
            //this.floorInd[1] = this.floorInd[1].substr(0, index) + what + this.floorInd[1].substr(index + 1);
        res += this.liftOpen[line].substr(0,9);
        for (j = 0; j<m; j++)
          res += this.personIn;
        res += this.liftOpen[line].substr(9+m);
      }
    }
    else {
      res += this.liftClose[line];
    }
  };
};

Printer.prototype.getQueue = function (people, line, width) {
  // For now editable with just the number of people varying
  var n = people.length;
  var res = "";
  res += this.floorChar;
  for (i = 0; i < n; i++) {
    res += this.person[line];
    res += this.floorChar;
  }
  while (res.length < width)
    res += this.floorChar;
  return res;
};

Printer.prototype.getIndicators = function (elevators, line) {
  var n = elevators.length;
  var res = "";
  var digs = [];
  var i = 0;
  var x = 0;
  var j = 0;
  if (line == 0 || line == 2) {
    for (i = 0; i< n ; i++)
      res += this.floorInd[line];
  }
  else {
    for (i = 0; i < n; i++) {
      x = elevators[i].getFloor;
      digs.push(this.charOf(x % 10));
      x/=10;
      digs.push(this.charOf(x % 10));
      x/=10;
      digs.push(this.charOf(x);
      for (j = 0; j<3; j++) 
        this.replaceAtInd(digPos[j],digs[j]);
    }
  }
  return res;
};

Printer.prototype.replaceAtInd = function (index, what) {
  this.floorInd[1] = this.floorInd[1].substr(0, index) + what + this.floorInd[1].substr(index + 1);
  return;
};

Printer.prototype.redraw = function() {
  var result = this.getString;
  // do the printing of result.
};

Printer.prototype.charOf = function(digit) {
  if (digit == 0)
    return '0';
  if (digit == 1)
    return '1';
  if (digit == 2)
    return '2';
  if (digit == 3)
    return '3';
  if (digit == 4)
    return '4';
  if (digit == 5)
    return '5';
  if (digit == 6)
    return '6';
  if (digit == 7)
    return '7';
  if (digit == 8)
    return '8';
  if (digit == 9)
    return '9';
  return '0';
};

module.exports = Printer;
