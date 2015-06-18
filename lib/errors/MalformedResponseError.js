"use strict";

var Util = require("util");

function MalformedResponseError (message) {
	this.name = "MalformedResponseError";
	this.message = message;
	Object.freeze(this);
}

Util.inherits(MalformedResponseError, Error);

module.exports = MalformedResponseError;
