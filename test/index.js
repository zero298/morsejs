/*jslint node:true*/
/*global morsejs, describe, it, expect */

"use strict";

describe("Test morsejs translating", function () {
    it("Checks that morsejs translates a single letter properly", function () {
        var actual = morsejs.translate("x"),
            expected = [1, -1, 0, -1, 0, -1, 1];
        expect(actual).toEqual(expected);
    });

    it("Checks that morsejs translates words properly", function () {
        var actual = morsejs.translate("sos"),
            expected = [
                0, -1, 0, -1, 0, // s
                -1, -1, -1,
                1, -1, 1, -1, 1, // o
                -1, -1, -1,
                0, -1, 0, -1, 0 // s
            ];
        expect(actual).toEqual(expected);
    });

    it("Checks that morsejs translates phrases correctly", function () {
        var actual = morsejs.translate("help me"),
            expected = [
                0, -1, 0, -1, 0, -1, 0, // h
                -1, -1, -1,
                0, // e
                -1, -1, -1,
                0, -1, 1, -1, 0, -1, 0, // l
                -1, -1, -1,
                0, -1, 1, -1, 1, -1, 0, // p
                -1, -1, -1, -1, -1, -1, -1,
                1, -1, 1, // m
                -1, -1, -1,
                0 // e
            ];
        expect(actual).toEqual(expected);
    });

    it("Checks that morsejs throws an error with invalid messages", function () {
        expect(function () {
            morsejs.translate("!!");
        }).toThrow();
    });
});