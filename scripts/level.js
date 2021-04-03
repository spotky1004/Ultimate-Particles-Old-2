"use strict";

class Level {
    constructor(level={}) {
        this.rawLevel = Spl.copyObj(level);

        this.resetLevel();
    }

    resetLevel() {
        const level = Spl.copyObj(this.rawLevel);

        this.actions = level.actions ?? {};
        
        this.values = {};
        this.values.phase = 0;
        this.values.playerHp = 10;
        this.values.levelInfo = "Phase ${this.values.phase}<br>HP ${this.values.playerHp}";
        const tempObj = this.values;
        this.values = {tempObj, ...(level.values ?? {})};
        this.values.tickSpent = 0;
        
        this.config = level.config ?? {};

        this.particles = level.particles ?? {};
        for (const name in this.particles) this.particles[name] = new Particle(this.particles[name], name);

        this.caches = {};
        this.caches.tags = {};
        this.caches.types = {};
    }

    update() {
        for (const name in this.particles) {
            const particle = this.particles[name];
            particle.particleUpdate(levelPlaying.config.tickSpeed);
        }
    }
}

function levelLoader(filePath="") {
    fetch(filePath)
    .then(response => response.json())
    .then(gotJSON => {levelPlaying = new Level(gotJSON)})
    .catch(e => console.log(new Error(e)));
}

/** @type {Level} */
let levelPlaying = new Level();

levelLoader("./levels/example.json");