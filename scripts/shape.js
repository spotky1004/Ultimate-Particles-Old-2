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
            x: this.position.x-this.getCentroid().x,
            y: this.position.y-this.getCentroid().y,
        };
        if (position.startsWith("Q")) return 0; // 
    }
    getPointsNew(getFor=this.sides) {
        // ㅁㄴㅇㅇㄻㄴㄻㄴㅇㄹㄴㅇㄻㄴㅇㄹㄴㅇㄻㄴㅇ
        /** @type {Shape} */
        var points = [{x: 0, y: -1}];

        var sScale = 2*Math.sin(toRadian(180/getFor))
        
        // Point Calc
        for (var i = 1; i < getFor; i++) {
            var tmpPoint = {}
            tmpPoint.x = points[points.length-1].x
            tmpPoint.y = points[points.length-1].y

            var rotateDeg = (90*(getFor-2)/getFor) + (i-1)*(360-360/getFor)
            tmpPoint.x += Math.sin(toRadian(rotateDeg))*sScale
            tmpPoint.y += Math.cos(toRadian(rotateDeg))*sScale
            points.push(tmpPoint)
        }
        // Offset Rotate Calc
        for (var i = 0; i < getFor; i++) {
            var tmpPoint = {}
            tmpPoint.x = points[i].x
            tmpPoint.y = points[i].y

            var rotateDeg = (90*(getFor-2)/getFor) + (i-1)*(360-360/getFor)
            tmpPoint = {x: tmpPoint.x*Math.cos(this.getRadOf(180/this.sides))-tmpPoint.y*Math.sin(this.getRadOf(180/this.sides)),
                        y: tmpPoint.x*Math.sin(this.getRadOf(180/this.sides))+tmpPoint.y*Math.cos(this.getRadOf(180/this.sides))}
            points[i] = tmpPoint
        }
        // Size Calc
        for (var i = 0; i < getFor; i++) {
            var tmpPoint = {}
            tmpPoint.x = points[i].x*this.getSize().x*Math.sqrt(2)
            tmpPoint.y = points[i].y*this.getSize().y*Math.sqrt(2)
            points[i] = tmpPoint
        }
        // Rotate Calc
        for (var i = 0; i < getFor; i++) {
            var tmpPoint = {}
            tmpPoint.x = points[i].x
            tmpPoint.y = points[i].y

            var rotateDeg = (90*(getFor-2)/getFor) + (i-1)*(360-360/getFor)
            tmpPoint = {x: tmpPoint.x*Math.cos(this.getRadOf(this.rotate))-tmpPoint.y*Math.sin(this.getRadOf(this.rotate)),
                        y: tmpPoint.x*Math.sin(this.getRadOf(this.rotate))+tmpPoint.y*Math.cos(this.getRadOf(this.rotate))}
            points[i] = tmpPoint
        }
        // Position Calc
        for (var i = 0; i < getFor; i++) {
            var tmpPoint = {}
            tmpPoint.x = points[i].x+this.position.x
            tmpPoint.y = points[i].y+this.position.y
            points[i] = tmpPoint
        }

        
        return points;
    }
    getPoints(getFor=this.sides) {
        // ㅁㄴㅇㅇㄻㄴㄻㄴㅇㄹㄴㅇㄻㄴㅇㄹㄴㅇㄻㄴㅇ
        /** @type {Shape} */
        let points = [];
        let tempPosition = {...this.position}

        var sScale = 1/(getFor/2*Math.cos(Math.rad((180-(180/getFor*(getFor-2)))/2)))/0.7071067811865475*(getFor==3?0.7071067811865475:1);
        // var d1 = (-d + 180 / s) % 360;
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
            tempPosition.x += Math.sin(i*(Math.PI*2/this.sides) + this.getRadOf(45-this.rotate) + Math.PI / this.sides)*this.getSizeCoefficient()*this.getSize().x;
            tempPosition.y += Math.cos(i*(Math.PI*2/this.sides) + this.getRadOf(45-this.rotate) + Math.PI / this.sides)*this.getSizeCoefficient()*this.getSize().y;
        }

        return points;
    }
    getArea() {
        var c = 0
        var points = this.getPoints()
        for (var i=0; i<points.length-1; i++) {
            var tempPosition = points[i]
            var tempNextPosition = points[i+1]
            c += ((tempPosition.x*tempNextPosition.y)-(tempNextPosition.x*tempPosition.y))/2
        }
        c += ((points[points.length-1].x*points[0].y)-(points[0].x*points[points.length-1].y))/2
        return c
    }
    getCentroid() {
        var c = {
            x: 0,
            y: 0
        }
        var points = this.getPoints()
        for (var i=0; i<points.length-1; i++) {
            var tempPosition = points[i]
            var tempNextPosition = points[i+1]
            c.y += (tempPosition.y+tempNextPosition.y)*((tempPosition.x*tempNextPosition.y)-(tempNextPosition.x*tempPosition.y))/6/this.getArea()
            c.x += (tempPosition.x+tempNextPosition.x)*((tempPosition.x*tempNextPosition.y)-(tempNextPosition.x*tempPosition.y))/6/this.getArea()
        }
        c.x += (points[points.length-1].x+points[0].x)*((points[points.length-1].x*points[0].y)-(points[0].x*points[points.length-1].y))/6/this.getArea()
        c.y += (points[points.length-1].y+points[0].y)*((points[points.length-1].x*points[0].y)-(points[0].x*points[points.length-1].y))/6/this.getArea()
        return c
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
