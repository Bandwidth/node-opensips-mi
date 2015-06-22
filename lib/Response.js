"use strict";
var CommandError           = require("./errors/CommandError");
var MalformedResponseError = require("./errors/MalformedResponseError");
var _                      = require("lodash");

function Response (code, message, body) {
	this.code = code;
	this.message = message;
	this.body = body;
	this.success = _.inRange(this.code, 200, 299);
	Object.freeze(this);
}

Response.fromBuffer = function (buffer) {
	var rawMessage = buffer.toString();
	var lines = _.compact(rawMessage.split("\n"));

	var parts = lines.shift().trim().match(/(\d+)\s+(.+)/);

	if (!parts || _.size(parts) !== 3) {
		throw new MalformedResponseError("Invalid response status.");
	}

	var code = parts[1];
	var message = parts[2];

	if (code >= 400) {
		throw new CommandError(code, message);
	}

	if (_.isEmpty(lines)) {
		throw new MalformedResponseError("No response body.");
	}

	var body = lines;

	return new Response(code, message, body);
};

Object.freeze(Response);

module.exports = Response;
