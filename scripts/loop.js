"use strict";

let tickSpeed = 15, tickSpent = 0, mainInterval, canvasUpdater, editorUpdater;

function loop() {
    if (windowBlured) return;
    levelPlaying.update();
    updateCanvas();
    updateEditor();
    tickSpent++;
}

function startMainInterval() {
    mainInterval = setInterval(loop, tickSpeed);
}

startMainInterval();
