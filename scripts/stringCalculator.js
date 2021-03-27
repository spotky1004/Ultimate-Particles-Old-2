"use strict";

const replacerList = {
    h() {return levelPlaying.values.playerHp},
    p() {return levelPlaying.values.phase},
    t() {return levelPlaying.values.tick},
    T() {return new Date().getTime()},
    r() {return Math.random()},
    s() {return Math.floor(Math.random()*2)*2-1},
}

const OperatorPriority = [
    ["log", "sin", "cos", "tan", "tan2"],
    ["*", "/"],
    ["+", "-"]
];

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
        let exReplacer = this.extendedReplacer(extender);

        let result = stringReplacer(this.parsed);

        function stringReplacer(arr) {
            let tempResult = "";
            for (let i = 0, l = arr.length; i < l; i++) {
                if (Array.isArray(arr[i])) {
                    tempResult += stringReplacer(arr[i]);
                } else if (arr[i].startsWith("$") && Object.keys(exReplacer).includes(arr[i][1])) {
                    tempResult += exReplacer[arr[i][1]]();
                } else {
                    tempResult += arr[i].toString();
                }
            }
            return tempResult;
        }

        return result;
    }

    calculate(extender={}) {
        let exReplacer = this.extendedReplacer(extender);

        function innerCalculator(arr) {
            for (let i = 0, l1 = OperatorPriority.length; i < l1; i++) {
                for (let j = 0; j < arr.length; j++) {
                    if (!OperatorPriority[i].includes(arr[j])) continue;
                    if (i == 0) {
                        let num = numberParse(arr[j+1]);
                        arr[j] = Math[arr[j]](num);
                        arr.splice(j+1, 1);
                        j--;
                    } else {
                        let num = [];
                        for (let k = 0; k < 2; k++) {
                            const numT = arr[j-1+2*k];
                            num.push(numberParse(numT));
                        }
                        let numToReplce;
                        switch (arr[j]) {
                            case "*":
                                numToReplce = num[0]*num[1];
                                break;
                            case "/":
                                numToReplce = num[0]/num[1];
                                break;
                            case "+":
                                numToReplce = num[0]+num[1];
                                break;
                            case "-":
                                numToReplce = num[0]-num[1];
                                break;
                        }
                        arr[j-1] = numToReplce;
                        arr.splice(j, 2);
                        j -= 2;
                    }
                }
            }
            if (typeof arr[0] == "string" && arr[0].startsWith("$")) arr[0] = numberParse(arr[0]);
            return Number(arr[0]);
        }

        function numberParse(term) {
            if (Array.isArray(term)) {
                return innerCalculator(term);
            } else if (typeof term === "string" && term.startsWith("$") && Object.keys(exReplacer).includes(term[1])) {
                return exReplacer[term[1]]();
            } else {
                return Number(term);
            }
        }

        return innerCalculator([...this.parsed]);;
    }

    extendedReplacer(extender={}) {
        let exReplacer = {...replacerList, ...extender};

        return exReplacer;
    }
}

console.log(new StringCalculator("$r*$s*(2+8)").calculate());