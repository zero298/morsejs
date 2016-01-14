/*jslint node:true */
/*global module */

"use strict";

module.exports = function (config) {
    config.set({
        basePath: "..",
        frameworks: [
            "jasmine"
        ],
        files: [
            "src/**/*.js",
            "test/**/*.js"
        ],
        exclude: [
        ],
        preprocessors: {
            "src/**/*.js": ["coverage"]
        },
        reporters: [
            "progress",
            "coverage"
        ],
        coverageReporter: {
            dir: "coverage",
            reporters: [{
                type: "text"
            }]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: [
            "Chrome",
            "Firefox",
            "PhantomJS"
        ],
        singleRun: true
    });
};