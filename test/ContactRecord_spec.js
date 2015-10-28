"use strict";
var expect = require("chai").expect;

var ContactRecord = require("../lib/ContactRecord");

describe("A ContactRecord", function () {
	describe("being parsed", function () {
		var record;

		before(function () {
			record = ContactRecord.parse([
				"Contact:: <sip:tester@177.135.168.30:37225;line=004d205e4461132>;",
				"q=0.5;expires=3252;flags=0x0;cflags=0x0;socket=<udp:52.4.77.11:5060>;",
				"methods=0xFFFFFFFF;received=<sip:177.135.168.30:37225>;",
				"user_agent=<Linphone/3.6.1 (eXosip2/4.0.0)>"
			].join(""));
		});

		it("returns a ContactRecord instance", function () {
			expect(record).to.be.an.instanceOf(ContactRecord);
		});

		describe("the resulting ContactRecord", function () {
			it("has the correct contact", function () {
				expect(record.contact).to.equal("sip:tester@177.135.168.30:37225;line=004d205e4461132");
			});

			it("has the correct properties", function () {
				expect(record.properties).to.deep.equal({
					q          : "0.5",
					expires    : "3252",
					flags      : "0x0",
					cflags     : "0x0",
					socket     : "udp:52.4.77.11:5060",
					methods    : "0xFFFFFFFF",
					received   : "sip:177.135.168.30:37225",
					user_agent : "Linphone/3.6.1 (eXosip2/4.0.0)"
				});
			});
		});
	});
});

