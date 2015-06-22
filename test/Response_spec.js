"use strict";
var Bluebird = require("bluebird");
var expect   = require("chai").expect;
var fixtures = require("./helpers/fixtures");
var _        = require("lodash");

var CommandError           = require("../lib/errors/CommandError");
var MalformedResponseError = require("../lib/errors/MalformedResponseError");
var Response               = require("../lib/Response");

describe("A Response", function () {
	describe("with a 2xx code", function () {
		var codes     = _.range(200, 299);
		var responses = _.map(codes, function (code) {
			return new Response(code, "test message", []);
		});

		it("should be set as successful", function () {
			_.each(responses, function (response) {
				expect(response.success).to.be.true;
			});
		});
	});

	describe("with a 3xx code", function () {
		var codes     = _.range(300, 399);
		var responses = _.map(codes, function (code) {
			return new Response(code, "test message", []);
		});

		it("should be set as successful", function () {
			_.each(responses, function (response) {
				expect(response.success).to.be.false;
			});
		});
	});

	describe("with a 4xx code", function () {
		var codes     = _.range(400, 499);
		var responses = _.map(codes, function (code) {
			return new Response(code, "test message", []);
		});

		it("should be set as successful", function () {
			_.each(responses, function (response) {
				expect(response.success).to.be.false;
			});
		});
	});

	describe("being parsed from a buffer", function () {
		var validBuffer;
		var badStatusBuffer;
		var noBodyBuffer;
		var errorCodeBuffer;

		before(function (done) {
			Bluebird.all([
				fixtures.loadFixture("show-contact/valid.txt"),
				fixtures.loadFixture("show-contact/bad-status.txt"),
				fixtures.loadFixture("show-contact/no-body.txt"),
				fixtures.loadFixture("show-contact/error-code.txt")
			])
			.spread(function (valid, badStatus, noBody, errorCode) {
				validBuffer     = valid;
				badStatusBuffer = badStatus;
				noBodyBuffer    = noBody;
				errorCodeBuffer = errorCode;
			})
			.nodeify(done);
		});

		describe("with a valid message", function () {
			it("returns a Response", function () {
				expect(Response.fromBuffer(validBuffer)).to.be.an.instanceOf(Response);
			});
		});

		describe("with an invalid status line", function () {
			it("throws a MalformedResponseError", function () {
				expect(function () {
					Response.fromBuffer(badStatusBuffer);
				}).to.throw(MalformedResponseError, "Invalid response status.");
			});
		});

		describe("with no body", function () {
			it("throws a MalformedResponseError", function () {
				expect(function () {
					Response.fromBuffer(noBodyBuffer);
				}).to.throw(MalformedResponseError, "No response body.");
			});
		});

		describe("with an error status code", function () {
			it("throws a CommandError", function () {
				expect(function () {
					Response.fromBuffer(errorCodeBuffer);
				}).to.throw(CommandError, "400 - Bad Request");
			});
		});
	});
});
