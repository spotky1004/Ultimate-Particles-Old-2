rawLevel = {
    actions: {
        actionExample: {
            activeType: "phase", // affect to "activePer" working, can use "phase" or "tickSpent"
            condition: [[0, 10], [30, 40]], // if value.phase is '[n][0] < x [n][1]', active this (all condition works separated)
            activePer: 2, // active this action for every n "activeType"
            function: [
                {
                    functionType: "summonParticle",
                    loopCount: 10,
                    innerFunction: {
                        id: "exampleParticle_$p_$l",
                        attr: {
                            size: 3,
                            position: {
                                x: "$l*10",
                                y: "$r*10"
                            }
                        },
                        tag: ["exampleParticle"]
                    }
                }
            ]
        },
    },
    particles: {
        player: {size: 4, behave: "player", color: "#000"}
    },
    values: {
        levelInfo: "Phase $p<br>HP $h",
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
         * "SemiSeparated": all player particle will use it's own hp (End game when a player particle dies)
         * "Separated": all player particle will use it's own hp (End game if all player particle dies)
        */
    }
}