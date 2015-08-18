/*global define, module */

"use strict";

// Support UMD
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof module === "object" && module.exports) {
        // Node but not strict CommonJS
        module.exports = factory();
    } else {
        // Browser
        root.morsejs = factory();
    }
}(this, function () {
    // Predefine our vars
    var exports, signal, mcode;

    /**
     * Morse code module
     * @module morsejs
     */
    exports = {};

    /**
     * Enum for the signals sent by morse
     * @memberof module:morsejs
     * @readonly
     * @enum {Number}
     */
    signal = {
        /** Padding used between signals, characters and words */
        PADD: -1,
        /** A short signal code */
        SHORT: 0,
        /** A long signal code */
        LONG: 1
    };

    /**
     * Enums for the available letter codings used by morse
     * @readonly
     * @enum {Number[]}
     */
    mcode = {
        /** Code for A */
        "a": [signal.SHORT, signal.LONG],
        /** Code for B */
        "b": [signal.LONG, signal.SHORT, signal.SHORT, signal.SHORT],
        /** Code for C */
        "c": [signal.LONG, signal.SHORT, signal.LONG, signal.SHORT],
        /** Code for D */
        "d": [signal.LONG, signal.SHORT, signal.SHORT],
        /** Code for E */
        "e": [signal.SHORT],
        /** Code for F */
        "f": [signal.SHORT, signal.SHORT, signal.LONG, signal.SHORT],
        /** Code for G */
        "g": [signal.LONG, signal.LONG, signal.SHORT],
        /** Code for H */
        "h": [signal.SHORT, signal.SHORT, signal.SHORT, signal.SHORT],
        /** Code for I */
        "i": [signal.SHORT, signal.SHORT],
        /** Code for J */
        "j": [signal.SHORT, signal.LONG, signal.LONG, signal.LONG],
        /** Code for K */
        "k": [signal.LONG, signal.SHORT, signal.LONG],
        /** Code for L */
        "l": [signal.SHORT, signal.LONG, signal.SHORT, signal.SHORT],
        /** Code for M */
        "m": [signal.LONG, signal.LONG],
        /** Code for N */
        "n": [signal.LONG, signal.SHORT],
        /** Code for O */
        "o": [signal.LONG, signal.LONG, signal.LONG],
        /** Code for P */
        "p": [signal.SHORT, signal.LONG, signal.LONG, signal.SHORT],
        /** Code for Q */
        "q": [signal.LONG, signal.LONG, signal.SHORT, signal.LONG],
        /** Code for R */
        "r": [signal.SHORT, signal.LONG, signal.SHORT],
        /** Code for S */
        "s": [signal.SHORT, signal.SHORT, signal.SHORT],
        /** Code for T */
        "t": [signal.LONG],
        /** Code for U */
        "u": [signal.SHORT, signal.SHORT, signal.LONG],
        /** Code for V */
        "v": [signal.SHORT, signal.SHORT, signal.LONG],
        /** Code for W */
        "w": [signal.SHORT, signal.LONG, signal.LONG],
        /** Code for X */
        "x": [signal.LONG, signal.SHORT, signal.SHORT, signal.LONG],
        /** Code for Y */
        "y": [signal.LONG, signal.SHORT, signal.LONG, signal.LONG],
        /** Code for Z */
        "z": [signal.LONG, signal.LONG, signal.SHORT, signal.SHORT],
        /** Code for 1 */
        "1": [signal.SHORT, signal.LONG, signal.LONG, signal.LONG, signal.LONG],
        /** Code for 2 */
        "2": [signal.SHORT, signal.SHORT, signal.LONG, signal.LONG, signal.LONG],
        /** Code for 3 */
        "3": [signal.SHORT, signal.SHORT, signal.SHORT, signal.LONG, signal.LONG],
        /** Code for 4 */
        "4": [signal.SHORT, signal.SHORT, signal.SHORT, signal.SHORT, signal.LONG],
        /** Code for 5 */
        "5": [signal.SHORT, signal.SHORT, signal.SHORT, signal.SHORT, signal.SHORT],
        /** Code for 6 */
        "6": [signal.LONG, signal.SHORT, signal.SHORT, signal.SHORT, signal.SHORT],
        /** Code for 7 */
        "7": [signal.LONG, signal.LONG, signal.SHORT, signal.SHORT, signal.SHORT],
        /** Code for 8 */
        "8": [signal.LONG, signal.LONG, signal.LONG, signal.SHORT, signal.SHORT],
        /** Code for 9 */
        "9": [signal.LONG, signal.LONG, signal.LONG, signal.LONG, signal.SHORT],
        /** Code for 0 */
        "0": [signal.LONG, signal.LONG, signal.LONG, signal.LONG, signal.LONG],
        /** Code for inter-character pause */
        "char": [signal.PADD],
        /** Code for character pause */
        "pause": [signal.PADD, signal.PADD, signal.PADD],
        /** Code for word pause */
        "space": [signal.PADD, signal.PADD, signal.PADD, signal.PADD, signal.PADD, signal.PADD, signal.PADD]
    };

    /**
     * Function to translate a string into a morse message
     * @memberof module:morsejs
     * @throws Given message must be a string
     * @param {String} message The message to translate
     * @returns {Number[]} An array of numbers symbolizing long/short
     */
    function translate(message) {
        // Keep an array to hold the whole translated message
        var translated = [];
        // Make sure we were given a String
        if (typeof message === "string") {
            // Make lower case, split into words, and iterate each word
            message.toLowerCase().split(" ").forEach(function (word, mIndex, mArr) {
                // Iterate each letter
                Array.prototype.forEach.call(word, function (letter, wIndex, wArr) {
                    // Iterate each symbol of the letter
                    mcode[letter].forEach(function (symbol, cIndex, cArr) {
                        // Push the current long/short symbol
                        translated.push(symbol);
                        // While we are in the middle of the symbol array
                        if (cIndex < (cArr.length - 1)) {
                            // Add a symbol separator
                            translated = translated.concat(mcode.char);
                        }
                    });
                    // While we are in the middle of the letter array
                    if (wIndex < (wArr.length - 1)) {
                        // Add a letter separator
                        translated = translated.concat(mcode.pause);
                    }
                });
                // While we are in the middle of the word array
                if (mIndex < (mArr.length - 1)) {
                    // Add a word separator
                    translated = translated.concat(mcode.space);
                }
            });
        } else {
            // Throw an exception saying as much
            throw "Message must be a string";
        }
        // Return our translated morse code message
        return translated;
    }

    // Export stuff
    exports.signal = signal;
    exports.translate = translate;

    // Return our module
    return exports;
}));