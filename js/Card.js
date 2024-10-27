define(["domBinding"],
function(domBinding){
    "use strict";

    var suits =  ['red', 'yellow', 'blue', 'green'];

    var Card = function(id){
        this.id = id;
        this.num = id % 13 + 1;
        this.suit = id % 4;
        this.flipped = true;

        var acutualNum = this.num + 1;
        var numtext = acutualNum + '';
        if(acutualNum > 10){
            numtext = ({
                11: 'Skip', // Skip
                12: 'Reverse', // Reverse
                13: 'Draw Two', // Draw Two
                14: 0, 
            })[acutualNum];
        }
        this.display = domBinding.createCardDisplay(numtext, this.suit);
        this.display.onClick = this.shift.bind(this);
     };

    Card.suits = suits;

    Card.prototype.adjustPos = function(noUpdate){
        if(!noUpdate) this.pos = this.parent.getPosFor(this.ind);
        this.display.adjustPos(this.pos);
    };

    Card.prototype.shift = function(){
        if(!this.display.isSelectable()) return;
        if(!this.parent.curShifted) return;
        if(this.parent.curShifted.indexOf(this) !== -1){
            this.parent.removeShift(this);
        }else{
            this.parent.addShift(this);
        }
    };

    Card.prototype.out = function(){
        this.display.out();
    };

    return Card;
});
