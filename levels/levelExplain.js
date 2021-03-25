rawLevel = {
    actions: {
        phaseActiveType: {
            activeType: "phase", // affect to "activePer" working, can use "phase" or "tickSpent"
            condition: [[0, 10], [30, 40]], // if value.phase is '[n][0] < x [n][1]', active this (all condition works separated)
            activePer: 2 // active this action for every n "activeType"
        },
    },
    particles: {
        player: {size: 4, behave: "player", color: "#000"}
    },
    values: {
        levelInfo: "Phase ${this.values.phase}<br>HP ${this.values.playerHp}",
        playerHp: 10,
        phase: 0,
        tickSpent: 0
    },
    config: {
        tickSpeed: 15, // length of each tick in ms

        phaseLength: 10, // length of each phase in ms

        advenced: false,
        /* set this to true will allow do more complex calculate like behave:"wall" particle
         *
         * list of complex calculates: 'better wall collision'
        */
        playerHpType: "Merged"
        /* set how player hp works
         *
         * "Merged": all player particle will use same hp source (level.values.playerHp)
         * "Separated1": all player particle will use it's own hp (End game when a player particle dies)
         * "Separated2": all player particle will use it's own hp (End game if all player particle dies)
        */
    }
}