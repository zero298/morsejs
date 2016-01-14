/*jslint node:true nomen:true*/

"use strict";

console.log("dirname: " + __dirname);

var morse = require("./src/morsejs"),
    toTranslate = (process.argv[2] || null);

if (toTranslate) {
    console.log(morse.translate(toTranslate));
} else {
    console.log("Please provide a message to translate");
}