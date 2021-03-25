"use strict";

class Particle extends Shape {
    constructor(attrs={}) {
        super(attrs); // super!

        this.type = attrs.type ?? "shape";
        this.behave = attrs.behave ?? "enemy";
        this.color = attrs.color ?? "#f00";
    }
    
    type = "shape";
    behave = "enemy";
    color = "#f00";

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