/*jslint node:true */
/*global module */
module.exports = function (config) {
    config.set({
        basePath: "..",
        frameworks: ["jasmine"],
        files: [
            "src/**/*.js",
            "js/**/*.js",
            "test/**/*.js"
        ],
        exclude: [
        ],
        preprocessors: {
            "js/*.js": "coverage"
        },
        reporters: [
            "progress",
            "coverage"
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["Chrome"],
        singleRun: false
    });
};
