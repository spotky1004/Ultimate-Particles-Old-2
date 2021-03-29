"use strict";

class Shape {
    constructor (attrs={}) {
        this.size = attrs.size ?? {x: 0.02, y: 0.02}; // size of the Shape; Object: {x: x, y: y} or Number
        this.sizeMultiply = attrs.sizeMultiply ?? 1; // multiply to both of size; Number
        this.sides = attrs.sides ?? 4; // sides of the Shape; Number
        this.position = attrs.position ?? {x: 0, y: 0}; // position of Shape; Object: {x: x, y: y}
        this.rotate = attrs.rotate ?? 90; // rotation deg of Shape; Number
        this.degType = attrs.degType ?? "deg"; // type of deg input; String: "rad" or "deg"

        this.increments = attrs.increments ?? {};

        // property fix
        if (typeof this.size === "number") {
            const temp = this.size;
            this.size = {x: temp, y: temp};
        }
    }

    size = {x: 0.02, y: 0.02};
    sizeMultiply = 1;
    sides = 4;
    position = {x: 0, y: 0};
    rotate = 0;
    degType = "deg";

    update(dt) {
        const dtc = dt/1000;

        for (const i in this.increments) {
            const tempVal = this.increments[i];

            switch (typeof tempVal) {
                case "number":
                    this[i] += tempVal * dtc;
                    break;
                case "object":
                    for (const j in tempVal) {
                        this[i][j] += tempVal[j] * dtc;
                    }
                    break;
            }
        }
    }

    getPosition(position="center") {
        /* 
        *  list of positions
        *
        * "center": return position of center of the shape
        * "firstPoint": return position of the first point
        * "Qn": retrun point of the quadrant for a suqare; eg) "Q1" -> top-right, "Q2" -> top-left...
        */

        if (position === "center") return {...this.position};
        if (position === "firstPoint") return {
            x: this.getDistenceToCenter().x+this.position.x,
            y: this.getDistenceToCenter().y+this.position.y,
        };
        if (position.startsWith("Q")) return 0;
    }

    getPoints(getFor=this.sides) {
        let points = [];
        let tempPosition = this.getPosition("firstPoint");

        // var d1 = (-d + 180 / s) % 360;
        // var sScale = 1/(particles[name].sides/2*Math.cos(Math.rad((180-(180/particles[name].sides*(particles[name].sides-2)))/2)))/0.7071067811865475*(particles[name].sides==3?0.7071067811865475:1);
        // var centerL = Math.csc(Math.rad(180 / s)) / 2 * particles[name].absSize*sScale;
        // var lastPos = [
        //   maxLeng * (-(screenSettings.p[0]+(1-screenSettings.size)) / 2 * screenSettings.scale + 0.5 + p[0] / 2 * screenSettings.scale - Math.sin(Math.rad(d1)) * centerL * particles[name].size[0] * screenSettings.scale),
        //   maxLeng * ((screenSettings.p[1]-(1-screenSettings.size)) / 2 * screenSettings.scale + 0.5 - p[1] / 2 * screenSettings.scale - Math.cos(Math.rad(d1)) * centerL * particles[name].size[1] * screenSettings.scale)
        // ];

        // var p = shapes[name].position;
        // var s = shapes[name].sides;
        // var d = shapes[name].rotation;
        // var d1 = (-d+180/s)%360;
        // var centerL = Math.csc(Math.rad(180/s))/2*shapes[name].lineLength;
        // var lastPos = [
        //   innerHeight*(-canvasSetting.position[0]/2*canvasSetting.scale+0.5+p[0]/2*canvasSetting.scale-Math.sin(Math.rad(d1))*centerL*shapes[name].scale[0]*canvasSetting.scale),
        //   innerHeight*(canvasSetting.position[1]/2*canvasSetting.scale+0.5-p[1]/2*canvasSetting.scale-Math.cos(Math.rad(d1))*centerL*shapes[name].scale[1]*canvasSetting.scale)
        // ];
        // c.moveTo(lastPos[0], lastPos[1]);
        // for (var i = 0; i < shapes[name].sides; i++) {
        //   lastPos[0] += Math.sin(Math.PI*2/s*i+Math.rad(d+90))*(innerHeight*shapes[name].lineLength)*shapes[name].scale[0]*canvasSetting.scale;
        //   lastPos[1] -= Math.cos(Math.PI*2/s*i+Math.rad(d+90))*(innerHeight*shapes[name].lineLength)*shapes[name].scale[1]*canvasSetting.scale;
        //   c.lineTo(lastPos[0], lastPos[1]);
        // }

        for (let i = 0; i < getFor; i++) {
            points.push({...tempPosition});
            tempPosition.x += Math.sin(i*(Math.PI*2/this.sides) + this.getRadOf(-this.rotate) + Math.PI / this.sides)*this.getSizeCoefficient()*this.getSize().x;
            tempPosition.y += Math.cos(i*(Math.PI*2/this.sides) + this.getRadOf(-this.rotate) + Math.PI / this.sides)*this.getSizeCoefficient()*this.getSize().y;
        }

        return points;
    }
    getCentroid() {
        var c = {
            x: 0,
            y: 0
        }
        var points = this.getPoints()
        for (var i in points) {
            tempPosition = points[i]
            tempNextPosition = points[i+1]
            c[x] += (tempPosition.x*tempNextPosition.x)*(tempPosition.x*tempNextPosition.y-tempNextPosition.x*tempPosition.y)
            c[y] += (tempPosition.y*tempNextPosition.y)*(tempPosition.x*tempNextPosition.y-tempNextPosition.x*tempPosition.y)
        }
    }

    getSizeCoefficient() {
        return 1/( this.sides/2*Math.cos( (Math.PI-(Math.PI/this.sides*(this.sides-2)))/2 ) )/0.7071067811865475*(this.sides===3?0.7071067811865475:1);
    }

    getDistenceToCenter() {
        // var d1 = (-d + 180 / s) % 360;
        // Math.sin(Math.rad(d1)) * centerL * particles[name].size[0] * screenSettings.scale)

        const tempLength = Math.csc(Math.PI / this.sides) * this.getSizeCoefficient() / 2;

        return {
            x: tempLength * this.getSize().x*Math.sin(this.getRadOf(-this.rotate) + Math.PI / this.sides),
            y: tempLength * this.getSize().y*Math.cos(this.getRadOf(-this.rotate) + Math.PI / this.sides)
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
        return (this.degType === "rad" ? deg : Math.rad(deg));
    }
}
