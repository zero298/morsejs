/*jslint node:true browser:true*/
/*global define, module */

// Support UMD
(function (root, factory) {
    "use strict";

    /*istanbul ignore next*/
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
    "use strict";

    // Predefine our vars
    var exports, signal, encoding, mcode;

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
     * Enum for encoding settings
     * @memberof module:morsejs
     * @readonly
     * @enum {Number}
     */
    encoding = {
        /** Default padded encoding */
        PADDED: 1,
        /** Run length encoding */
        RLE: 2,
        /** Dot dash encoding */
        DOTDASH: 3
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
     * Function to encode a message with padding included
     * @memberof module:morsejs
     * @inner
     * @param {Number[]} message The morse message to encode
     * @returns {Number[]} The padding encoded message
     */
    function encodePadded(message) {
        // Array to store our encoded message
        var translated = [];

        // Function to iterate symbols and append their signal values and padding
        function symbolIterator(symbol, cIndex, cArr) {
            // Push the current long/short symbol
            translated.push(symbol);

            // While we are in the middle of the symbol array
            if (cIndex < (cArr.length - 1)) {
                // Add a symbol separator
                translated = translated.concat(mcode.char);
            }
        }

        // Function to iterate letters and append their symbols and padding
        function letterIterator(letter, wIndex, wArr) {
            // Iterate each symbol of the letter
            mcode[letter].forEach(symbolIterator);

            // While we are in the middle of the letter array
            if (wIndex < (wArr.length - 1)) {
                // Add a letter separator
                translated = translated.concat(mcode.pause);
            }
        }

        // Function to remove letters that we can't translate
        function letterFilter(value) {
            // Return whether or not we can
            return mcode[value];
        }

        // Function to iterate words and append their letters and padding
        function wordIterator(word, mIndex, mArr) {
            // Iterate each letter
            word.split("").filter(letterFilter).forEach(letterIterator);

            // While we are in the middle of the word array
            if (mIndex < (mArr.length - 1)) {
                // Add a word separator
                translated = translated.concat(mcode.space);
            }
        }

        // Make lower case, split into words, and iterate each word
        message.toLowerCase().split(" ").forEach(wordIterator);

        // Return our padding encoded message
        return translated;
    }

    /**
     * Function to encode a message with run length encoding
     * @memberof module:morsejs
     * @inner
     * @param {Number[]} message The morse message to encode
     * @returns {String} The RLE encoded message
     */
    function encodeDotDash(message) {
        // Reduce our message to a translated on/off graph
        return encodePadded(message).reduce(function (prev, curr, index) {
            switch (curr) {
            case signal.SHORT:
                return prev + "-";
            case signal.LONG:
                return prev + "---";
            default:
                return prev + "_";
            }
        }, "");
    }

    /**
     * Function to encode a message with run length encoding
     * @memberof module:morsejs
     * @inner
     * @param {Number[]} message The morse message to encode
     * @returns {Number[]} The RLE encoded message
     */
    function encodeRLE(message) {
        return message;
    }

    /**
     * Function to translate a string into a morse message
     * @memberof module:morsejs
     * @throws Message must be a string
     * @throws Unsupported encoding type
     * @param {String} message The message to translate
     * @param {Object} [kwargs] The translation settings
     * @param {Number} [kwargs.encoding] The translation encoding setting
     * @returns {Number[]|String} An array of numbers or a string containing the translated message
     */
    function translate(message, kwargs) {
        // Keep an array to hold the whole translated message
        var translated,
            encodeOp = encoding.PADDED;

        // Check encoding
        if (kwargs && (kwargs.hasOwnProperty("encoding"))) {
            encodeOp = kwargs.encoding;
        }

        // Make sure we were given a String
        if (typeof message === "string") {
            // Check for compression
            switch (encodeOp) {
            case encoding.PADDED:
                translated = encodePadded(message);
                break;
            case encoding.RLE:
                translated = encodeRLE(message);
                break;
            case encoding.DOTDASH:
                translated = encodeDotDash(message);
                break;
            default:
                throw "Unsupported encoding type";
            }
        } else {
            // Throw an exception saying as much
            throw "Message must be a string";
        }

        // Return our translated morse code message
        return translated;
    }

    // Export stuff
    exports.signal = signal;
    exports.encoding = encoding;
    exports.translate = translate;

    // Return our module
    return exports;
}));