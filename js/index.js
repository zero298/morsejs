/*jslint browser:true*/
/*global morsejs*/

"use strict";

(function (morsejs) {
    document.addEventListener("DOMContentLoaded", function () {
        // Get our elements
        var
            xmlNs = "http://www.w3.org/2000/svg",
            tForm = document.getElementById("translationForm"),
            tText = document.getElementById("translationText"),
            tResult = document.getElementById("translationResult"),
            mGraph = document.getElementById("morseDisplay");

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
                if (el === 0) {
                    // Make a dot
                    newItem = document.createElementNS(xmlNs, "circle");
                    newItem.setAttribute("cx", ((16 * index) + 8));
                    newItem.setAttribute("cy", "50%");
                    newItem.setAttribute("r", 4);
                    newItem.setAttribute("fill", "#333333");
                } else if (el === 1) {
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

        // Add submit listener to the translation form
        tForm.addEventListener("submit", function (submitEvent) {
            try {
                // Translate the message provided in the input
                var translatedMessage = morsejs.translate(tText.value);
                // Graph the message to the SVG
                graphMorse(mGraph, translatedMessage);
            } catch (e) {
                // Let the user know that they must only use letters or numbers
                tResult.innerHTML = "Please an alphanumeric message.";
            }
            // Prevent the submit
            submitEvent.preventDefault();
        });
    });
}(morsejs));