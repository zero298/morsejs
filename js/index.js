/*jslint browser:true*/
/*global morsejs, AudioContext*/

"use strict";

(function (mj) {
    document.addEventListener("DOMContentLoaded", function () {
        // Get our elements
        var
            xmlNs = "http://www.w3.org/2000/svg",
            tForm = document.getElementById("translationForm"),
            tText = document.getElementById("translationText"),
            dCbox = document.getElementById("drawCheckbox"),
            pCbox = document.getElementById("playCheckbox"),
            tResult = document.getElementById("translationResult"),
            mGraph = document.getElementById("morseDisplay"),
            mAudio = new AudioContext();

        // Function to graph a message to an SVG
        function graphMorse(svgElement, message) {
            // Clear the svg
            while (svgElement.lastChild) {
                svgElement.removeChild(svgElement.lastChild);
            }
            // Add stuff to the svg
            message.forEach(function (el, index) {
                // Variable to hold new SVG shape
                var newItem;
                // See if it is a short or long signal
                if (el === mj.signal.SHORT) {
                    // Make a dot
                    newItem = document.createElementNS(xmlNs, "circle");
                    newItem.setAttribute("cx", ((16 * index) + 8));
                    newItem.setAttribute("cy", "50%");
                    newItem.setAttribute("r", 4);
                    newItem.setAttribute("fill", "#333333");
                } else if (el === mj.signal.LONG) {
                    // Make a dash
                    newItem = document.createElementNS(xmlNs, "line");
                    newItem.setAttribute("x1", (16 * index));
                    newItem.setAttribute("x2", ((16 * index) + 16));
                    newItem.setAttribute("y1", "50%");
                    newItem.setAttribute("y2", "50%");
                    newItem.setAttribute("stroke", "#333333");
                    newItem.setAttribute("stroke-width", 2);
                }
                // If we made an item
                if (newItem) {
                    // Append it to the SVG
                    svgElement.appendChild(newItem);
                }
            });
        }

        // Function to play a morse message using the WebAudio API
        function playMorse(actx, message) {
            var
                mIndex,
                osc,
                longDuration = 100,
                shortDuration = (longDuration * 0.5);

                // Function figure out how long a signal should play
            function getSignalTime(signal) {
                var timeDuration = 0;
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

            // Function to determine the strength of a signal
            function getSignalStrength(signal) {
                var strength = 0;
                switch (signal) {
                case mj.signal.SHORT:
                case mj.signal.LONG:
                    strength = 500;
                    break;
                default:
                    break;
                }
                return strength;
            }

            // Function to cause the morse message to play over audio
            function transmitMessage(signal) {
                osc.frequency.value = getSignalStrength(signal);
                setTimeout(function () {
                    if (mIndex < message.length) {
                        transmitMessage(message[mIndex]);
                        mIndex += 1;
                    } else {
                        osc.stop();
                    }
                }, getSignalTime(signal));
            }

            // Set our message index
            mIndex = 0;

            // Create a sound and start it
            osc = actx.createOscillator();
            osc.type = "sin";
            osc.frequency.value = 0;
            osc.connect(actx.destination);
            osc.start();

            // Start the transmission
            transmitMessage(mIndex);
        }

        // Add submit listener to the translation form
        tForm.addEventListener("submit", function (submitEvent) {
            try {
                // Translate the message provided in the input
                var translatedMessage = mj.translate(tText.value);

                if (dCbox.checked) {
                    // Graph the message to the SVG
                    graphMorse(mGraph, translatedMessage);
                }
                if (pCbox.checked) {
                    playMorse(mAudio, translatedMessage);
                }
            } catch (e) {
                // Let the user know that they must only use letters or numbers
                tResult.innerHTML = "Please an alphanumeric message.";
            }
            // Prevent the submit
            submitEvent.preventDefault();
        });
    });
}(morsejs));