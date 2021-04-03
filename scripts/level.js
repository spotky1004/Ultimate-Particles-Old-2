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

        this.caches = {};
        this.caches.tags = {};
        this.caches.types = {};
        for (const type in particleTypeData) this.caches.types[type] = [];
        this.caches.behaves = {};
        for (const behave in particleBehaveData) this.caches.behaves[behave] = [];

        this.particles = level.particles ?? {};
        for (const name in level.particles) this.particles[name] = new Particle(this.particles[name], name);
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