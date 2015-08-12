"use strict";

var assert = require("assert"),
    morsejs = require("../src/morsejs");

function testLetterTranslation() {
    var actual = morsejs.translate("x"),
        expected = [1, -1, 0, -1, 0, -1, 1];
    assert.deepEqual(actual, expected, "Letter translation must equal expected value");
}

function testWordTranslation() {
    var actual = morsejs.translate("sos"),
        expected = [
            0, -1, 0, -1, 0,              // s
            -1, -1, -1,
            1, -1, 1, -1, 1,              // o
            -1, -1, -1,
            0, -1, 0, -1, 0               // s
        ];
    assert.deepEqual(actual, expected, "Word translation must equal expected value");
}

function testPhraseTranslation() {
    var actual = morsejs.translate("help me"),
        expected = [
            0, -1, 0, -1, 0, -1, 0,       // h
            -1, -1, -1,
            0,                            // e
            -1, -1, -1,
            0, -1, 1, -1, 0, -1, 0,       // l
            -1, -1, -1,
            0, -1, 1, -1, 1, -1, 0,       // p
            -1, -1, -1, -1, -1, -1, -1,
            1, -1, 1,                     // m
            -1, -1, -1,
            0                             // e
        ];
    assert.deepEqual(actual, expected, "Phrase translation must equal expected value");
}

function testInvalidMessage() {
    assert.throws(function () {
        morsejs.translate("!!");
    }, "Message must be a string", "Invalid messages should throw an exception");
}

testLetterTranslation();
testWordTranslation();
testPhraseTranslation();
testInvalidMessage();