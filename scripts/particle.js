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

        if (typeof levelPlaying.caches.types[this.type] == "undefined") levelPlaying.caches.types[this.type] = [];
        levelPlaying.caches.types[this.type].push(id);
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

    getDebugInfo(debugList=[]) {
      if (debugList.includes('coordinate')) {
        console.log(`Draw Position: ${Math.roundAt(super.getPoints()[0].x*2-super.getCentroid().x, 3)}`)
        console.log(`Center: ${Math.roundAt(super.getCentroid().x, 3)}`)
      }
    }

    draw(canvas, offset, scale) {
        const points = super.getPoints();
        canvas.strokeStyle = this.color;
        canvas.fillStyle = this.color;
        canvas.lineWidth = 0;

        canvas.beginPath();
        canvas.moveTo(
            Math.round((points[0].x*2+offset.x)*scale-super.getCentroid().x*scale),
            Math.round((points[0].y*2+offset.y)*scale-super.getCentroid().y*scale)
        );
        for (var i = 1, l = points.length; i < l; i++) {
            canvas.lineTo(
                Math.round((points[i].x*2+offset.x-super.getCentroid().x)*scale),
                Math.round((points[i].y*2+offset.y-super.getCentroid().y)*scale)
            );
        }
        canvas.closePath();
        canvas.fill();
    }

    changeType(type="") {
        levelPlaying.caches.types[this.type].push(id);
    }

    addTag(name="") {
        this.tag.push(name);
        if (this.tag.findIndex(e => e == name) === this.tag.length-1) {
            let t = levelPlaying.caches.tag[name];
            if (typeof t === "undefined") {
                levelPlaying.caches.tag[name] = [];
                t = levelPlaying.caches.tag[name];
            }
            t.push(this.id);
        } else {
            this.tag = [...new Set(this.tag)]
        }

        return this;
    }

    removeTag(name="") {
        const idx = this.tag.findIndex(e => e === name);
        if (idx === -1) return this;
        const t = this.tag.splice(idx, 1)[0];
        levelPlaying.caches.tag[name].splice(levelPlaying.caches.tag[name].findIndex(e => e === t), 1);

        return this;
    }
}

const particleTypeData = {
    text: {drawPoint: "firstPoint"},
    shape: {drawPoint: "center"},
    linearGradient: {drawPoint: "firstPoint"},
    radialGradient: {drawPoint: "center"}
};
/*
var d1 = (-d + 180 / s) % 360;
          var sScale = 1/(particles[name].sides/2*Math.cos(Math.rad((180-(180/particles[name].sides*(particles[name].sides-2)))/2)))/0.7071067811865475*(particles[name].sides==3?0.7071067811865475:1);
          var centerL = Math.csc(Math.rad(180 / s)) / 2 *
          var lastPos = [
            maxLeng * (-(screenSettings.p[0]+(1-screenSettings.size)) / 2 * screenSettings.scale + 0.5 + p[0] / 2 * screenSettings.scale - Math.sin(Math.rad(d1)) * centerL * particles[name].size[0] * screenSettings.scale),
            maxLeng * ((screenSettings.p[1]-(1-screenSettings.size)) / 2 * screenSettings.scale + 0.5 - p[1] / 2 * screenSettings.scale - Math.cos(Math.rad(d1)) * centerL * particles[name].size[1] * screenSettings.scale)
          ];
          if (particles[name].image != "") {
            if (typeof imageCaches[particles[name].image] == "undefined") {
              imageCaches[particles[name].image] = new Image(100, 100);
              imageCaches[particles[name].image].src = particles[name].image;
            }
            const image = imageCaches[particles[name].image];
            var d1 = (-d + 180 / s) % 360;
            var sScale = 1/(particles[name].sides/2*Math.cos(Math.rad((180-(180/particles[name].sides*(particles[name].sides-2)))/2)))/0.7071067811865475*(particles[name].sides==3?0.7071067811865475:1);
            var centerL = Math.csc(Math.rad(180 / s)) / 2 * particles[name].absSize*sScale;
            var lastPos = [
              maxLeng * (-(screenSettings.p[0]+(1-screenSettings.size)) / 2 * screenSettings.scale + 0.5 + p[0] / 2 * screenSettings.scale - Math.sin(Math.rad(d1)) * centerL * particles[name].size[0] * screenSettings.scale),
              maxLeng * ((screenSettings.p[1]-(1-screenSettings.size)) / 2 * screenSettings.scale + 0.5 - p[1] / 2 * screenSettings.scale - Math.cos(Math.rad(d1)) * centerL * particles[name].size[1] * screenSettings.scale)
            ];
            c.drawImage(image, lastPos[0], lastPos[1], maxLeng*particles[name].getTotAbsSize()[0]*screenSettings.scale, maxLeng*particles[name].getTotAbsSize()[1]*screenSettings.scale);
          } else if (s == -2) {
            var posOffset = [
              (-(screenSettings.p[0]+(1-screenSettings.size)) / 2 * screenSettings.scale + 0.5 + particles[name].position[0]/2*screenSettings.scale),
              ((screenSettings.p[1]-(1-screenSettings.size)) / 2 * screenSettings.scale + 0.5 - particles[name].position[1]/2*screenSettings.scale)
            ];
            var center = getCenter(particles[name].points);
            for (var i = 0, l = particles[name].points.length; i < l; i++) {
              var dist = Math.sqrt((particles[name].points[i].x-center[0])**2+(particles[name].points[i].y-center[1])**2);
              var centerDeg = (Math.atan2(particles[name].points[i].y-center[1], particles[name].points[i].x-center[0])*180/Math.PI-(d%360)+810)%360;
              var tempPos = [Math.sin(Math.rad(centerDeg))*dist+center[0], -Math.cos(Math.rad(centerDeg))*dist+center[1]];
              var lastPos = [
                (tempPos[0]/2*screenSettings.scale*particles[name].absSize+posOffset[0])*maxLeng,
                (tempPos[1]/2*screenSettings.scale*particles[name].absSize+posOffset[1])*maxLeng
              ];
              if (i != 0) {
                c.lineTo(lastPos[0], lastPos[1]);
              } else {
                c.moveTo(lastPos[0], lastPos[1]);
              }
            }
            c.closePath();
          } else if (s == -1 || s >= 100) {
            var lastPos = [
              maxLeng * (-(screenSettings.p[0]+(1-screenSettings.size)) / 2 * screenSettings.scale + 0.5 + p[0] / 2 * screenSettings.scale ),
              maxLeng * ((screenSettings.p[1]-(1-screenSettings.size)) / 2 * screenSettings.scale + 0.5 - p[1] / 2 * screenSettings.scale )
            ];
            c.arc(lastPos[0], lastPos[1], maxLeng*particles[name].getTotAbsSize()[0]/2*screenSettings.scale, 0, 2*Math.PI);
          } else if (s == 4 && d == 0) {
            c.rect(lastPos[0], lastPos[1], maxLeng*particles[name].getTotAbsSize()[0]*screenSettings.scale, maxLeng*particles[name].getTotAbsSize()[1]*screenSettings.scale);
          } else {
            c.moveTo(lastPos[0], lastPos[1]);
            for (var i = 0; i < particles[name].sides; i++) {
              lastPos[0] += Math.sin(Math.PI * 2 / particles[name].sides * i + Math.rad(d + 90)) * (maxLeng * particles[name].absSize) * particles[name].size[0] * screenSettings.scale * sScale;
              lastPos[1] -= Math.cos(Math.PI * 2 / particles[name].sides * i + Math.rad(d + 90)) * (maxLeng * particles[name].absSize) * particles[name].size[1] * screenSettings.scale * sScale;
              c.lineTo(lastPos[0], lastPos[1]);
            }
            c.closePath();
          }
          c.fill();
          c.stroke();*/