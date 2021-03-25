"use strict";

let tickSpeed = 15, tickSpent = 0, mainInterval, canvasUpdater;

function loop() {
    updateAll();
    updateCanvas();
    tickSpent++;
}

function updateAll() {
    
}

function startMainInterval() {
    mainInterval = setInterval(loop, tickSpeed);
}

canvasUpdater = setInterval(updateCanvas, 15);
startMainInterval();
