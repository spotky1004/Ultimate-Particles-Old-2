"use strict";

let canvasFrame = document.getElementById("canvasFrame");
let canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
let c = canvas.getContext('2d');
let canvasShape = new Particle({
    size: {x: 0.8, y: 0.4},
    color: "#f5c542"
});


function updateCanvas() {
    // set canvasFrame size
    canvasFrame.style.setProperty("--sizeMultiply", canvasShape.sizeMultiply);
    canvasFrame.style.setProperty("--sizeMultiplyX", canvasShape.size.x);
    canvasFrame.style.setProperty("--sizeMultiplyY", canvasShape.size.y);

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