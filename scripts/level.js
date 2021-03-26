"use strict";

class Level {
    constructor(level={}) {
        this.rawLevel = Spl.copyObj(level);

        this.resetLevel();
    }

    resetLevel() {
        const level = this.rawLevel;

        this.actions = level.actions ?? {};
        
        this.values = {};
        this.values.phase = 0;
        this.values.playerHp = 10;
        this.values.levelInfo = "Phase ${this.values.phase}<br>HP ${this.values.playerHp}";
        const tempObj = this.values;
        this.values = {tempObj, ...(level.values ?? {})};
        this.values.tickSpent = 0;
        
        this.config = level.config ?? {};
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