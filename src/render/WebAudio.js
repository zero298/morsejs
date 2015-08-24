/*jslint browser:true */
/*global define, module, AudioContext */

"use strict";

// Support UMD
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["morsejs"], factory);
    } else if (typeof module === "object" && module.exports) {
        // Node but not strict CommonJS
        module.exports = factory(require("morsejs"));
    } else {
        // Browser
        root.morsejsRenderWebAudio = factory(root.morsejs);
    }
}(this, function (mj) {
    // Predefine our vars
    var
        exports,
        DURATION_LONG,
        DURATION_SHORT,
        SIGNAL_STRENGTH_OFF,
        SIGNAL_STRENGTH_ON;

    /**
     * Morse code WebAudio rendering module
     * @module morsejs/render/WebAudio
     */
    exports = {};

    /**
     * The length of time a long signal lasts
     * @constant {Number}
     */
    DURATION_LONG = 100;
    /**
     * The length of time a short signal lasts
     * @constant {Number}
     */
    DURATION_SHORT = (DURATION_LONG * 0.5);
    /**
     * The frequency of the signal while off
     * @constant {Number}
     */
    SIGNAL_STRENGTH_OFF = 0;
    /**
     * The frequency of the signal while on
     * @constant {Number}
     */
    SIGNAL_STRENGTH_ON = 500;

    /**
     * Function figure out how long a signal should play
     * @memberof module:morsejs/render/WebAudio
     * @inner
     * @param {Number} signal The signal to find the duration of
     * @returns {Number} The duration of the signal given
     */
    function getSignalTime(signal) {
        var
            timeDuration = 0,
            longDuration = DURATION_LONG,
            shortDuration = DURATION_SHORT;

        switch (signal) {
        case mj.signal.SHORT:
            timeDuration = shortDuration;
            break;
        default:
            timeDuration = longDuration;
            break;
        }
        return timeDuration;
    }

    /**
     * Function to determine the strength of a signal
     * @memberof module:morsejs/render/WebAudio
     * @inner
     * @param {Number} signal The signal to find the strength of
     * @returns {Number} The frequency strength of the signal given
     */
    function getSignalStrength(signal) {
        var strength = SIGNAL_STRENGTH_OFF;
        switch (signal) {
        case mj.signal.SHORT:
        case mj.signal.LONG:
            strength = SIGNAL_STRENGTH_ON;
            break;
        default:
            break;
        }
        return strength;
    }

    /**
     * Recursive function to play a message over WebAudio
     * @memberof module:morsejs/render/WebAudio
     * @inner
     * @param {String} message The message to play
     * @param {Number} index The index of the signal within the message to play
     * @param {OscillatorNode} oscillator The oscilator used to play the message
     */
    function transmitMessage(message, index, oscillator) {
        var signal = message[index];

        oscillator.frequency.value = getSignalStrength(signal);
        setTimeout(function () {
            if (index < message.length) {
                transmitMessage(message, (index + 1), oscillator);
                index += 1;
            } else {
                oscillator.stop();
            }
        }, getSignalTime(signal));
    }

    /**
     * Function to play a morse message over WebAudio
     * @memberof module:morsejs/render/WebAudio
     * @param {AudioContext} actx The WebAudio context
     * @param {String} message The message to play
     */
    function playMorse(actx, message) {
        var mIndex, osc;

        // Set our message index
        mIndex = 0;

        // Create a sound and start it
        osc = actx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = SIGNAL_STRENGTH_OFF;
        osc.connect(actx.destination);
        osc.start();

        // Start the transmission
        transmitMessage(message, mIndex, osc);
    }

    // Export stuff
    exports.playMorse = playMorse;

    // Return our module
    return exports;
}));