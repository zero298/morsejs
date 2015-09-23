/*jslint browser:true */
/*global morsejs, morsejsRenderSVG, morsejsRenderWebAudio, AudioContext */

(function (mj, mrsvg, mrwa) {
    "use strict";

    // Normalize AudioContext for HTML5 vs Webkit
    window.AudioContext = (window.AudioContext || window.webkitAudioContext);

    // Wait for Document to load
    document.addEventListener("DOMContentLoaded", function () {
        // Get our elements
        var
            tForm = document.getElementById("translationForm"),
            tText = document.getElementById("translationText"),
            dCbox = document.getElementById("drawCheckbox"),
            pCbox = document.getElementById("playCheckbox"),
            tResult = document.getElementById("translationResult"),
            mGraph = document.getElementById("morseDisplay");

        // Add submit listener to the translation form
        tForm.addEventListener("submit", function (submitEvent) {
            try {
                // Translate the message provided in the input
                var translatedMessage = mj.translate(tText.value);

                if (dCbox.checked) {
                    // Graph the message to the SVG
                    mrsvg.graphMorse(mGraph, translatedMessage);
                }
                if (pCbox.checked) {
                    if (AudioContext !== "undefined") {
                        mrwa.playMorse(new AudioContext(), translatedMessage);
                    }
                }
            } catch (e) {
                // Let the user know that they must only use letters or numbers
                tResult.innerHTML = "Please an alphanumeric message.";
            }
            // Prevent the submit
            submitEvent.preventDefault();
        });
    });
}(morsejs, morsejsRenderSVG, morsejsRenderWebAudio));