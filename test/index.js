/*jslint node:true*/
/*global morsejs, describe, it, xit, expect, pending */

"use strict";

describe("Test morsejs translating", function () {
    it("Checks that morsejs translates a single letter properly", function () {
        var S, L, P, actual, expected;

        S = morsejs.signal.SHORT;
        L = morsejs.signal.LONG;
        P = morsejs.signal.PADD;

        actual = morsejs.translate("x");
        expected = [L, P, S, P, S, P, L];

        expect(actual).toEqual(expected);
    });

    it("Checks that morsejs translates words properly", function () {
        var S, L, P, actual, expected;

        S = morsejs.signal.SHORT;
        L = morsejs.signal.LONG;
        P = morsejs.signal.PADD;

        actual = morsejs.translate("sos");
        expected = [
            S, P, S, P, S, // s
            P, P, P,
            L, P, L, P, L, // o
            P, P, P,
            S, P, S, P, S // s
        ];

        expect(actual).toEqual(expected);
    });

    it("Checks that morsejs translates phrases correctly", function () {
        var S, L, P, actual, expected;

        S = morsejs.signal.SHORT;
        L = morsejs.signal.LONG;
        P = morsejs.signal.PADD;

        actual = morsejs.translate("help me");
        expected = [
            S, P, S, P, S, P, S, // h
            P, P, P,
            S, // e
            P, P, P,
            S, P, L, P, S, P, S, // l
            P, P, P,
            S, P, L, P, L, P, S, // p
            P, P, P, P, P, P, P,
            L, P, L, // m
            P, P, P,
            S // e
        ];

        expect(actual).toEqual(expected);
    });

    it("Checks padded encoding settings in translate", function () {
        var S, L, P, actual, expected;

        S = morsejs.signal.SHORT;
        L = morsejs.signal.LONG;
        P = morsejs.signal.PADD;

        actual = morsejs.translate("sos", {
            encoding: morsejs.encoding.PADDED
        });
        expected = [
            S, P, S, P, S, // s
            P, P, P,
            L, P, L, P, L, // o
            P, P, P,
            S, P, S, P, S // s
        ];
    });

    it("Checks RLE encoding settings in translate", function () {
        var actual, expected;
        
        // TODO: Finish RLE encoding

        // Encode a single character
        actual = morsejs.translate("sos", {
            encoding: morsejs.encoding.RLE
        });
        expected = [
            morsejs.signal.SHORT, 3,
            morsejs.signal.LONG, 3,
            morsejs.signal.SHORT, 3
        ];
        expect(actual).toEqual(expected);
        pending("Not implemented");
    });

    it("Checks dotDash encoding settings in translate", function () {
        var actual, expected;

        // Encode a single character
        actual = morsejs.translate("sos", {
            encoding: morsejs.encoding.DOTDASH
        });
        expected = "-_-_-___---_---_---___-_-_-";
        expect(actual).toEqual(expected);
    });

    it("Checks correct exception behavior when compress if given a bad compression type", function () {
        expect(function () {
            morsejs.translate("s", {
                encoding: "Some non-existant compression type"
            });
        }).toThrow();
    });

    it("Checks that morsejs ignores unsupported characters", function () {
        expect(morsejs.translate("hello world"))
            .toEqual(morsejs.translate("h~e*l(l)o w[o/r>l-d"));
    });

    it("Checks that morsejs throws an error with numerical parameter", function () {
        expect(function () {
            morsejs.translate();
        }).toThrow();
        
        expect(function () {
            morsejs.translate(123);
        }).toThrow();
    });
});