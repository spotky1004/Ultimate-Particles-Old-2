"use strict";

class Particle extends Shape {
    constructor(attrs={}, id) {
        super(attrs); // super! -> size, sizeMultiply, sides, position, rotate, degType & increments

        // important
        this.id = id ?? `particle${new Date().getTime()}`;
        this.type = attrs.type ?? "shape";
        this.behave = attrs.behave ?? "enemy";

        // view
        this.color = attrs.color ?? "#f00";

        // etc.
        this.tag = attrs.tag ?? [];
    }
    
    id = `particle${new Date().getTime()}`;
    type = "shape";
    behave = "enemy";
    color = "#f00";
    tag = [];

    particleUpdate(dt) {
        this.update(dt);

        return this;
    }

    draw(canvas, offset, scale) {
        const points = this.getPoints();
        canvas.strokeStyle = this.color;
        canvas.fillStyle = this.color;
        canvas.lineWidth = 0;
        canvas.beginPath();
        canvas.moveTo((points[0].x+offset.x)*scale, (points[0].y+offset.y)*scale);
        for (let i = 1, l = points.length; i < l; i++) {
            canvas.lineTo((points[i].x+offset.x)*scale, (points[i].y+offset.y)*scale);
        }
        canvas.closePath();
        canvas.fill();

        return this;
    }
}

const particleTypeData = {
    text: {drawPoint: "firstPoint"},
    shape: {drawPoint: "center"},
    linearGradient: {drawPoint: "firstPoint"},
    radialGradient: {drawPoint: "center"}
}