"use strict";

let windowBlured = false;
window.blur = () => windowBlured = true;
window.focus = () => windowBlured = false;

// for who want to use time more effective...

// Number related: romanize, timeNotation
// Etc.          : timer, copyObj

const Spl = {
    timer: ms => new Promise(
        res => {
            setTimeout(res, ms);
        }
    ),
    romanize: function(num) {
        // I got this function from somewhere in stackoverflow where I can't remember...
        if (num == 0) {
          return '0';
        }
        if (isNaN(num))
          return NaN;
        var digits = String(+num).split(""),
          key = [
            "","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
            "","I","II","III","IV","V","VI","VII","VIII","IX"
          ],
          roman = "",
          i = 3;
        while (i--)
          roman = (key[+digits.pop() + (i * 10)] || "") + roman;
          return (Array(+digits.join("") + 1).join("M") + roman).toLowerCase();
    },
    timeNotation: function(sec) {
        if (sec > 3600*24*365*100) return "way too long";
        if (sec > 3600*24*365) return `${(sec/3600/24/365).toFixed(3)}y`;
        if (sec > 3600*24) return `${(sec/3600/24).toFixed(2)}d`;
        if (sec > 3600) return `${(sec/3600).toFixed(2)}h`;
        if (sec > 60) return `${(sec/60).toFixed(2)}m`;
        if (sec > 1) return `${(sec).toFixed(1)}s`;
        return `${(sec*1000).toFixed(0)}ms`;
    },
    copyObj: function (obj) {
      let cObject = {};
      for (let i in obj) {
        if (Array.isArray(obj[i])) {
          cObject[i] = [];
          const tempArr = obj[i];
          for (let j = 0, l = tempArr.length; j < l; j++) {
            cObject[i].push(tempArr[j]);
          }
        } else if (typeof obj[i] === "object") {
          cObject[i] = this.copyObj(obj[i]);
        } else {
          cObject[i] = obj[i];
        }
      }
      return cObject;
    }
}