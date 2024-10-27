define(["Brain"],
function(Brain){
    "use strict";

    var SimpleBrain = function(user){
        Brain.call(this, user);
    };

    SimpleBrain.prototype = Object.create(Brain.prototype);

    SimpleBrain.prototype.decide = function(vc, board){
        var len = vc.length,
            color = -1, maxNum = -1;

        return $.Deferred().resolve((function(){
                if(board.length){
                color = board[0].color;
                maxNum = board.reduce(function(prev, cur){
                    if(cur.color === color && cur.num > prev){
                        return cur.num;
                    }else{
                        return prev;
                    }
                }, 0);
                return vc.reduce(function(prev, cur){
                    if(prev.color === cur.color){
                        if(cur.color === color){
                            if(cur.num < maxNum){
                                if(prev.num > maxNum || prev.num < cur.num) return cur;
                                else return prev;
                            }else if(cur.num > maxNum && prev.num > maxNum && board.length === 3){
                                if(cur.num > prev.num) return cur;
                                else return prev;
                            }else if(cur.num < prev.num){
                                return cur;
                            }else{
                                return prev;
                            }
                        }else{
                            if(cur.num > prev.num) return cur;
                            else return prev;
                        }
                    }else{
                        if(cur.color === 0 && cur.num === 11) return cur;
                        if(prev.color === 0 && prev.num === 11) return prev;
                        if(cur.color === 1) return cur;
                        if(prev.color === 1) return prev;
                        if(cur.num > prev.num) return cur;
                        return prev;
                    }
                }).ind;
            }else{
                return vc.reduce(function(prev, cur){
                    if(prev.num > cur.num) return cur;
                    else return prev;
                }).ind;
            }
        })());
    };

    return SimpleBrain;
});