"use strict";

const replacerList = {
    h() {return levelPlaying.values.playerHp},
    p() {return levelPlaying.values.phase},
    t() {return levelPlaying.values.tick},
    T() {return new Date().getTime()},
    r() {return Math.random()},
    s() {return Math.floor(Math.random()*2)*2-1},
}

class StringCalculator {
    constructor (str="") {
        this.parsed = str.replace(/()/g, "")
        .replace(/([0-9.]+)(\([^)]*\))/g, "$1*$2")
        .replace(/(\+|\-|\*|\/|log|sin|cos|tan|tan2|\(|\)|\$[a-zA-Z])/g, " $1 ")
        .replace(/ {2,}/g, " ")
        .replace(/^ | $/g, "")
        .split(" ");

        this.parsed = barketToArray(this.parsed);
        
        function barketToArray(arr=[]) {
            do {
                let openIdx = -1;
                for (let i = 0, l = arr.length; i < l; i++) {
                    if (arr[i] == "(") openIdx = i;
                    if (openIdx != -1 && arr[i] == ")") {
                        let tempArr = arr.slice(openIdx+1, i);
                        if (tempArr.includes("(") && tempArr.includes(")")) tempArr = barketToArray(tempArr);
                        arr[openIdx] = tempArr;
                        arr.splice(openIdx+1, i-openIdx);
                        openIdx = -1;
                    }
                }
            } while (arr.includes("(") && arr.includes(")"));
            while (arr.includes("(") || arr.includes(")")) arr.splice(arr.findIndex(ele => ele == ")"), 1);
            return arr;
        }
    }

    stringReplace(extender={}) {
        let result = "";

        function stringReplacer(params) {
            
        }

        return result;
    }

    calculate(extender={}) {
        
        if (extender instanceof Level) {

        }
    }
}

new StringCalculator("2$T").stringReplace();