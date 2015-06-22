"use strict";
var expect   = require("chai").expect;
var fixtures = require("./helpers/fixtures");
var Sinon    = require("sinon");
var _        = require("lodash");

var Response      = require("../lib/Response");
var ContactRecord = require("../lib/ContactRecord");
var util          = require("../lib/util");

describe("The util module", function () {
	describe("extracting a list of contacts from a response", function () {
		var response;
		var parse;
		var contacts;

		before(function (done) {
			parse = Sinon.stub(ContactRecord, "parse");

			fixtures.loadFixture("show-contact/valid.txt")
			.then(function (fixture) {
				response = Response.fromBuffer(fixture);
				contacts = util.extractContactList(response);
			})
			.nodeify(done);
		});

		after(function () {
			parse.restore();
		});

		it("parses each line of the body as a ContactRecord", function () {
			expect(parse.callCount, "called incorrect number of times").to.equal(response.body.length);
			_.forEach(response.body, function (line, index) {
				expect(parse.getCall(index).calledWith(line), "line not parsed").to.be.true;
			});
		});
	});
});
