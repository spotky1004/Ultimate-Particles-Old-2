"use strict";

let canvasFrame = document.getElementById("canvasFrame");
let canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
let c = canvas.getContext('2d');
let canvasShape = new Particle({
    size: 100,
    color: "#f5c542"
});
let canvasSettings = {
    scale: 1
};


function updateCanvas() {
    // set canvasFrame size
    canvasFrame.style.setProperty("--sizeMultiply", canvasShape.sizeMultiply);
    canvasFrame.style.setProperty("--sizeMultiplyX", canvasShape.size.x/100);
    canvasFrame.style.setProperty("--sizeMultiplyY", canvasShape.size.y/100);

    // fill background
    c.fillStyle = canvasShape.color;
    c.fillRect(0, 0, canvas.width, canvas.height);

    // draw particles
    /*for (const name in particles) {
        const pt = particles[name];
    }*/
}

function calcCanvasSize() {
    return {x: canvasShape};
}