"use strict";

class Shape {
    constructor (attrs={}) {
        this.size = attrs.size ?? {x: 0.02, y: 0.02}; // size of the Shape; Object: {x: x, y: y} or Number
        this.sizeMultiply = attrs.sizeMultiply ?? 1; // multiply to both of size; Number;
        this.sides = attrs.sides ?? 4; // sides of the Shape; Number
        this.position = attrs.position ?? {x: 0, y: 0}; // position of Shape; Object: {x: x, y: y}
        this.rotate = attrs.rotate ?? 0; // rotation deg of Shape; Number
        this.degType = attrs.degType ?? "deg"; // type of deg input; String: "rad" or "deg"

        // property fix
        if (typeof this.size === "number") this.size = {x: this.size, y: this.size};
    }

    size = {x: 0.02, y: 0.02};
    sizeMultiply = 1;
    sides = 4;
    position = {x: 0, y: 0};
    rotate = 0;
    degType = "deg";

    getPosition(position="center") {
        /* 
        *  list of positions
        *
        * "center": return position of center of the shape
        * "firstPoint": return position of the first point
        * "Qn": retrun point of the quadrant; eg) "Q1" -> top-right, "Q2" -> top-left...
        */

        if (position === "center") return {...this.position};
        if (position === "firstPoint") return this.getDistenceToCenter();
        if (position.startsWith("Q")) return 0;
    }

    getPoints(getFor=this.sides) {
        let points = [];
        let tempPosition = this.getPosition("firstPoint");

        for (let i = 0; i < getFor; i++) {
            points.push({...tempPosition});
            tempPosition.x += Math.sin(i*(Math.PI*2/this.sides))*this.getSizeCoefficient()*this.getSize().x;
            tempPosition.y += Math.cos(i*(Math.PI*2/this.sides))*this.getSizeCoefficient()*this.getSize().y;
        }

        return points;
    }

    getSizeCoefficient() {
        return 1/( this.sides/2*Math.cos( this.getRadOf( (180-(180/this.sides*(this.sides-2)))/2 ) ) )/0.7071067811865475*(this.sides==3?0.7071067811865475:1);
    }

    getDistenceToCenter() {
        const tempLength = Math.csc(Math.PI * 2 / this.sides) * this.getSizeCoefficient() * -0.5;

        return {
            x: tempLength * this.getSize().x,
            y: tempLength * this.getSize().y
        };
    }

    getSize() {
        let size = {...this.size};

        size.x = size.x*this.sizeMultiply;
        size.y = size.y*this.sizeMultiply;

        return size;
    }

    rotateAt(position={x: 0, y: 0}, deg=0) {
        const centerDeg = Math.atan2(this.x-position.x, this.y-position.y) + this.getRadOf(deg);
        const centerDistence = Math.sqrt( (this.x-position.x)**2 + (this.y-position.y)**2 );

        this.position.x = Math.sin(centerDeg)*centerDistence+position.x;
        this.position.y = Math.cos(centerDeg)*centerDistence+position.y;

        return this;
    }

    getRadOf(deg) {
        return this.degType == "rad" ? deg : Math.rad(deg);
    }
}