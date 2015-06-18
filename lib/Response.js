"use strict";
var CommandError           = require("./errors/CommandError");
var MalformedResponseError = require("./errors/MalformedResponseError");
var _                      = require("lodash");

function Response (buffer) {
	var message = buffer.toString();
	var lines = _.compact(message.split("\n"));

	if (_.isEmpty(lines)) {
		throw new MalformedResponseError("No response body.");
	}

	var parts = lines.shift().trim().match(/(\d+)\s+(.+)/);

	if (!parts || _.size(parts) !== 3) {
		throw new MalformedResponseError("Invalid response status.");
	}

	this.code = parts[1];
	this.message = parts[2];

	if (this.code >= 400) {
		throw new CommandError(this.code, this.message);
	}

	this.success = _.inRange(this.code, 200, 299);

	this.body = lines;

	Object.freeze(this);
}

Object.freeze(Response);

module.exports = Response;
