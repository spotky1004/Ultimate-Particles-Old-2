"use strict";

Math.rad = function(degrees) {
    return degrees * Math.PI / 180;
};

Math.csc = function(rad) {
    return 1 / Math.sin(rad);
};

Math.roundAt = function(value, idx) {
    return Math.round(value*(10**idx))/(10**idx)
}

function toRadian(value) {
    return value * Math.PI / 180
}