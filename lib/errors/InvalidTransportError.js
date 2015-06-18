"use strict";

var Util = require("util");

function InvalidTransportError (transport) {
	this.name = "InvalidTransportError";
	this.message = Util.format("Invalid transport: %s", transport);
	Object.freeze(this);
}

Util.inherits(InvalidTransportError, Error);

module.exports = InvalidTransportError;
