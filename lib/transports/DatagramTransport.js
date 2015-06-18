"use strict";
var Bluebird = require("bluebird");
var Dgram    = require("dgram");
var Util     = require("util");
var _        = require("lodash");

var RequestTimeoutError = require("../errors/RequestTimeoutError");
var Response            = require("../Response");
var Transport           = require("../Transport");

function applyDefaults (options) {
	return _.defaults(options || {}, {
		host       : "127.0.0.1",
		port       : 8080,
		maxRetries : 3,
		timeout    : 200
	});
}

function DatagramTransport (options) {
	options = applyDefaults(options);

	var host       = options.host;
	var port       = options.port;
	var maxRetries = options.maxRetries;
	var timeout    = options.timeout;

	function sendRequest (socket, responsePromise, message, retries) {
		retries = retries || 0;

		return socket.sendAsync(message, 0, message.length, port, host)
		.then(function () {
			return responsePromise
			.timeout(timeout)
			.catch(Bluebird.TimeoutError, function () {
				if (retries < maxRetries) {
					return sendRequest(socket, responsePromise, message, retries + 1);
				}
				else {
					throw new RequestTimeoutError(retries);
				}
			});
		});
	}

	this.command = function (commandName) {
		var commandArguments = _.tail(arguments);

		var resolve;
		var reject;
		var responsePromise = new Bluebird(function () {
			resolve = arguments[0];
			reject = arguments[1];
		});

		var socket = Bluebird.promisifyAll(Dgram.createSocket("udp4"));

		socket.on("message", function (buffer, rinfo) {
			// Drop messages that aren't from the remote host.
			if (rinfo.address !== host || rinfo.port !== port) {
				return;
			}

			try {
				resolve(new Response(buffer));
			}
			catch (error) {
				reject(error);
			}
		});

		var message = [
			Util.format(":%s:", commandName),
			commandArguments.join("\n")
		].join("\n");

		return sendRequest(socket, responsePromise, new Buffer(message))
		.finally(function () {
			socket.close();
		});
	};

	Object.freeze(this);
}

Util.inherits(DatagramTransport, Transport);

Object.freeze(DatagramTransport);

module.exports = DatagramTransport;
