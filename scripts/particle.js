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
    }
}

const particleTypeData = {
    text: {drawPoint: "firstPoint"},
    shape: {drawPoint: "center"},
    linearGradient: {drawPoint: "firstPoint"},
    radialGradient: {drawPoint: "center"}
}