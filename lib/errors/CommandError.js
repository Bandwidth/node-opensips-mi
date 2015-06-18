"use strict";

var Util = require("util");

function CommandError (code, phrase) {
	this.name = "CommandError";
	this.message = Util.format("%s - %s", code, phrase);
	Object.freeze(this);
}

Util.inherits(CommandError, Error);

module.exports = CommandError;
