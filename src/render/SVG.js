/*jslint browser:true */
/*global define, module */

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
        root.morsejsRenderSVG = factory(root.morsejs);
    }
}(this, function (mj) {
    var exports, svgXmlNs;

    /**
     * Morse code web module
     * @module morsejs/render/SVG
     */
    exports = {};

    // The namespace for SVG

    /**
     * The URI of the SVG XML namespace
     * @constant {String}
     */
    svgXmlNs = "http://www.w3.org/2000/svg";

    /**
     * Creates an SVGContext to use with the message loop
     * @class SVGContext
     * @memberof module:morsejs/render/SVG
     * @param {HTMLDocument} doc The document to append the SVG element to
     * @param {String} namespace The namespace to use when creating SVG elements
     * @param {SVGElement} element The SVG element we will be appending shapes to
     */
    function SVGContext(doc, namespace, element) {
        this.doc = doc;
        this.ns = namespace;
        this.el = element;
    }

    /**
     * Convert morse to a set of SVG tags and append them to an SVG element
     * @memberof module:morsejs/render/SVG
     * @inner
     * @param {Number} signal The signal to convert to an SVG Element
     * @param {Number} index The signal index within the message we want to convert
     */
    function elementAppender(signal, index) {
        // Variable to hold new SVG shape
        var newItem;
        // See if it is a short or long signal
        if (signal === mj.signal.SHORT) {
            // Make a dot
            newItem = this.doc.createElementNS(svgXmlNs, "circle");
            newItem.setAttribute("cx", ((16 * index) + 8));
            newItem.setAttribute("cy", "50%");
            newItem.setAttribute("r", 4);
            newItem.setAttribute("fill", "#333333");
        } else if (signal === mj.signal.LONG) {
            // Make a dash
            newItem = this.doc.createElementNS(svgXmlNs, "line");
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
            this.el.appendChild(newItem);
        }
    }

    /**
     * Function to graph a morse message to SVG
     * @memberof module:morsejs/render/SVG
     * @param {SVGSVGElement} svgElement The element to append to
     * @param {Number[]} message The morse message to graph
     */
    function graphMorse(svgElement, message) {
        // Create a context for our graphing loop
        var svgContext = new SVGContext(document, svgXmlNs, svgElement);

        // Clear the svg
        while (svgElement.lastChild) {
            svgElement.removeChild(svgElement.lastChild);
        }

        // Iterate our message
        message.forEach(elementAppender, svgContext);
    }

    // Export stuff
    exports.graphMorse = graphMorse;

    // Return our module
    return exports;
}));