"use strict";

let tickSpeed = 15, tickSpent = 0, mainInterval, canvasUpdater;

function loop() {
    levelPlaying.update();
    tickSpent++;
}

function startMainInterval() {
    mainInterval = setInterval(loop, tickSpeed);
}

canvasUpdater = setInterval(updateCanvas, 15);
//startMainInterval();
