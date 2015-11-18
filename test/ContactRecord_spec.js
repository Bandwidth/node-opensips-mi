"use strict";
var expect = require("chai").expect;

var ContactRecord = require("../lib/ContactRecord");

describe("A ContactRecord", function () {
	describe("being parsed", function () {
		var record;

		before(function () {
			record = ContactRecord.parse([
				"\tContact:: sip:ringto_user_1495526@187.42.31.10:42817;ob Q=0.5\n\t\t",
				"Expires:: 2336\n\t\tCallid:: FJas.XiUKJXQGWt4nfpISbRFFwCgWwd5\n\t\t",
				"Cseq:: 43646\n\t\tUser-agent:: BWSip Framework v1.0\n\t\t",
				"Received:: sip:187.42.31.10:42817\n\t\tState:: CS_NEW\n\t\tFlags:: 0\n\t\t",
				"Cflags:: \n\t\tSocket:: udp:52.4.77.11:9060\n\t\tMethods:: 8063"
			].join(""));
		});

		it("returns a ContactRecord instance", function () {
			expect(record).to.be.an.instanceOf(ContactRecord);
		});

		describe("the resulting ContactRecord", function () {
			it("has the correct contact", function () {
				expect(record.contact).to.deep.equal("sip:ringto_user_1495526@187.42.31.10:42817;ob");
			});

			it("has the correct properties", function () {
				expect(record.properties).to.deep.equal({
					Q            : "0.5",
					Expires      : "2336",
					Callid       : "FJas.XiUKJXQGWt4nfpISbRFFwCgWwd5",
					Cseq         : "43646",
					"User-agent" : "BWSip Framework v1.0",
					Received     : "sip:187.42.31.10:42817",
					State        : "CS_NEW",
					Flags        : "0",
					Cflags       : "",
					Socket       : "udp:52.4.77.11:9060",
					Methods      : "8063"
				});
			});
		});
	});
});