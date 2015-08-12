(function () {
    "use strict";

    /**
     * Morse code module
     * @module morse
     */

        /**
         * The value to use as the padding character
         * @var {Number} PADD
         */
    var PADD = -1,

        /**
         * The Value to use as the short character
         * @var {Number} SHORT
         */
        SHORT = 0,

        /**
         * The Value to use as the long character
         * @var {Number} LONG
         */
        LONG = 1,

        /**
         * Object that holds the translation values of letters and numbers
         * @var {Object} chars
         */
        chars = {
            "a": [SHORT, LONG],
            "b": [LONG, SHORT, SHORT, SHORT],
            "c": [LONG, SHORT, LONG, SHORT],
            "d": [LONG, SHORT, SHORT],
            "e": [SHORT],
            "f": [SHORT, SHORT, LONG, SHORT],
            "g": [LONG, LONG, SHORT],
            "h": [SHORT, SHORT, SHORT, SHORT],
            "i": [SHORT, SHORT],
            "j": [SHORT, LONG, LONG, LONG],
            "k": [LONG, SHORT, LONG],
            "l": [SHORT, LONG, SHORT, SHORT],
            "m": [LONG, LONG],
            "n": [LONG, SHORT],
            "o": [LONG, LONG, LONG],
            "p": [SHORT, LONG, LONG, SHORT],
            "q": [LONG, LONG, SHORT, LONG],
            "r": [SHORT, LONG, SHORT],
            "s": [SHORT, SHORT, SHORT],
            "t": [LONG],
            "u": [SHORT, SHORT, LONG],
            "v": [SHORT, SHORT, LONG],
            "w": [SHORT, LONG, LONG],
            "x": [LONG, SHORT, SHORT, LONG],
            "y": [LONG, SHORT, LONG, LONG],
            "z": [LONG, LONG, SHORT, SHORT],
            "1": [SHORT, LONG, LONG, LONG, LONG],
            "2": [SHORT, SHORT, LONG, LONG, LONG],
            "3": [SHORT, SHORT, SHORT, LONG, LONG],
            "4": [SHORT, SHORT, SHORT, SHORT, LONG],
            "5": [SHORT, SHORT, SHORT, SHORT, SHORT],
            "6": [LONG, SHORT, SHORT, SHORT, SHORT],
            "7": [LONG, LONG, SHORT, SHORT, SHORT],
            "8": [LONG, LONG, LONG, SHORT, SHORT],
            "9": [LONG, LONG, LONG, LONG, SHORT],
            "0": [LONG, LONG, LONG, LONG, LONG],
            "char": [PADD],
            "pause": [PADD, PADD, PADD],
            "space": [PADD, PADD, PADD, PADD, PADD, PADD, PADD]
        };

    /**
     * Function to translate a string into a morse message
     * @throws Given message must be a string
     * @param {String} message The message to translate
     * @returns {Number[]} An array of numbers symbolizing long/short
     */
    module.exports.translate = function (message) {
        // Keep an array to hold the whole translated message
        var translated = [];
        // Make sure we were given a String
        if (typeof message === "string") {
            // Make lower case, split into words, and iterate each word
            message.toLowerCase().split(" ").forEach(function (word, mIndex, mArr) {
                // Iterate each letter
                Array.prototype.forEach.call(word, function (letter, wIndex, wArr) {
                    // Iterate each symbol of the letter
                    chars[letter].forEach(function (symbol, cIndex, cArr) {
                        // Push the current long/short symbol
                        translated.push(symbol);
                        // While we are in the middle of the symbol array
                        if (cIndex < (cArr.length - 1)) {
                            // Add a symbol separator
                            translated = translated.concat(chars.char);
                        }
                    });
                    // While we are in the middle of the letter array
                    if (wIndex < (wArr.length - 1)) {
                        // Add a letter separator
                        translated = translated.concat(chars.pause);
                    }
                });
                // While we are in the middle of the word array
                if (mIndex < (mArr.length - 1)) {
                    // Add a word separator
                    translated = translated.concat(chars.space);
                }
            });
        } else {
            // Throw an exception saying as much
            throw "Message must be a string";
        }
        // Return our translated morse code message
        return translated;
    };
}());