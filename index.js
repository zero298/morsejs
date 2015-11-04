/*jslint node: true*/

"use strict";

var morse = require("./src/morsejs"),
    toTranslate = (process.argv[2] || null);

if (toTranslate) {
    console.log(morse.translate(toTranslate));
} else {
    console.log("Please provide a message to translate");
}