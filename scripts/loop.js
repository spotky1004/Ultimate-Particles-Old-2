"use strict";

let tickSpeed = 15, tickSpent = 0, mainInterval, canvasUpdater, editorUpdater;

function loop() {
    levelPlaying.update();
    tickSpent++;
}

function startMainInterval() {
    mainInterval = setInterval(loop, tickSpeed);
}

canvasUpdater = setInterval(updateCanvas, 15);
editorUpdater = setInterval(updateEditor, 15);
//startMainInterval();
