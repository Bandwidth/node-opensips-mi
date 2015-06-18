"use strict";
var DatagramTransport     = require("./transports/DatagramTransport");
var InvalidTransportError = require("./errors/InvalidTransportError");
var modules               = require("./modules");
var transports            = require("./transports");
var Transport             = require("./Transport");
var _                     = require("lodash");

function Client (transport) {
	this.command = transport.command;

	_.mapValues(modules, function (Module) {
		this[Module.namespace] = new Module(transport);
	}, this);

	Object.freeze(this);
}

Client.transports = transports;

Client.create = function (transport, options) {
	var TransportType = Client.transports[transport];

	if (!(TransportType && TransportType.prototype instanceof Transport)) {
		throw new InvalidTransportError(transport);
	}

	return new Client(new TransportType(options));
};

Object.freeze(Client);

module.exports = Client;
