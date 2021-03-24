"use strict";

Math.rad = function(degrees) {
    return degrees * Math.PI / 180;
};
Math.csc = function(rad) {
    return 1 / Math.sin(rad);
};