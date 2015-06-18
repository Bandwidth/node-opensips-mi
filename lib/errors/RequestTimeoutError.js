"use strict";

var util = require("util");

function RequestTimeoutError (retries) {
	this.retries = retries;
	this.name = "RequestTimeoutError";
	this.message = util.format("Request timeout after %s retries.", retries);
	Object.freeze(this);
}

util.inherits(RequestTimeoutError, Error);

module.exports = RequestTimeoutError;
