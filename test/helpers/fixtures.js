"use strict";
var Bluebird = require("bluebird");
var Fs       = require("fs");
var Path     = require("path");

Bluebird.promisifyAll(Fs);

var fixtures = module.exports = {};

fixtures.loadFixture = function (name) {
	var fixture = Path.resolve(__dirname, "..", "fixtures", name);
	return Fs.readFileAsync(fixture);
};

