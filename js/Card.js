define(["domBinding"],
function(domBinding) {
  "use strict";

  var colors = ['red', 'yellow', 'blue', 'green'];

  var Card = function(id) {
    this.id = id;
    this.value = id % 13 + 1; // 1-13 for number cards
    this.color = colors[id % 4]; // Map id to color
    this.flipped = true;

    // Convert value to Uno special card for values 11-14
    this.symbol = this.value > 10 ? ({
      11: 'Skip', 
      12: 'Reverse', 
      13: 'Draw Two', 
      14: 0, 
    })[this.value] : this.value;

    this.display = domBinding.createCardDisplay(this.symbol, this.color);
    this.display.onClick = this.shift.bind(this);
  };


  Card.prototype.adjustPos = function(noUpdate) {
    if (!noUpdate) this.pos = this.parent.getPosFor(this.ind);
    this.display.adjustPos(this.pos);
  };

  Card.prototype.shift = function() {
    if (!this.display.isSelectable()) return;
    if (!this.parent.curShifted) return;
    if (this.parent.curShifted.indexOf(this) !== -1) {
      this.parent.removeShift(this);
    } else {
      this.parent.addShift(this);
    }
  };

  Card.prototype.out = function() {
    this.display.out();
  };

  return Card;
});
