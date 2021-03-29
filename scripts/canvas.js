"use strict";

let canvasFrame = document.getElementById("canvasFrame");
let canvas = document.getElementById("canvas");
let tempCanvas = document.getElementById("tempCanvas");
/** @type {CanvasRenderingContext2D} */
let c = canvas.getContext('2d');
/** @type {CanvasRenderingContext2D} */
let tc = tempCanvas.getContext('2d');
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

    canvas.width = canvasFrame.offsetWidth*0.96;
    canvas.height = canvasFrame.offsetHeight*0.96;
    tempCanvas.width = canvasFrame.offsetWidth*0.96;
    tempCanvas.height = canvasFrame.offsetHeight*0.96;

    // fill background
    tc.fillStyle = canvasShape.color;
    tc.fillRect(0, 0, canvas.width, canvas.height);

    const particles = levelPlaying.particles;
    for (const name in particles) {
        particles[name].draw(
            tc,
            {
                x: canvasShape.position.x+canvasShape.getSize().x/2,
                y: canvasShape.position.y+canvasShape.getSize().y/2
            },
            canvasSettings.scale/100*Math.min(innerWidth, innerHeight)*0.96
        );
    }

    c.drawImage(tempCanvas, 0, 0);
}

function calcCanvasSize() {
    return {x: canvasShape};
}