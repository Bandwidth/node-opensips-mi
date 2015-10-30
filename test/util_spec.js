"use strict";
var expect        = require("chai").expect;
var fixtures      = require("./helpers/fixtures");
var Sinon         = require("sinon");
var _             = require("lodash");
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
	describe("parsing the contacts using the old response format", function () {
		var response;
		var expectedResults;
		var results;
		before(function () {
			expectedResults =
			[
				{
					contact    : "sip:tester@177.135.168.30:37225;line=004d205e4461132",
					properties :
					{
						q          : "0.5",
						expires    : "3252",
						flags      : "0x0",
						cflags     : "0x0",
						socket     : "udp:52.4.77.11:5060",
						methods    : "0xFFFFFFFF",
						received   : "sip:177.135.168.30:37225",
						user_agent : "Linphone/3.6.1 (eXosip2/4.0.0)"
					}
				},
				{
					contact    : "sip:tester@177.135.168.30:37225;line=004d205e4461132",
					properties :
					{
						q          : "0.5",
						expires    : "3252",
						flags      : "0x0",
						cflags     : "0x0",
						socket     : "udp:52.4.77.11:5060",
						methods    : "0xFFFFFFFF",
						received   : "sip:177.135.168.30:37225",
						user_agent : "Linphone/3.6.1 (eXosip2/4.0.0)"
					}
				},
				{
					contact    : "sip:tester@177.135.168.30:37225;line=004d205e4461132",
					properties :
					{
						q          : "0.5",
						expires    : "3252",
						flags      : "0x0",
						cflags     : "0x0",
						socket     : "udp:52.4.77.11:5060",
						methods    : "0xFFFFFFFF",
						received   : "sip:177.135.168.30:37225",
						user_agent : "Linphone/3.6.1 (eXosip2/4.0.0)"
					}
				}
			];
		});
		it("returns the correct Contact properties", function () {
			fixtures.loadFixture("show-contact/valid.txt")
			.then(function (fixture) {
				response = Response.fromBuffer(fixture);
				results = util.extractContactList(response);
				expect(results).to.deep.equal(expectedResults);
			})
			.catch(function (err) {
				console.log(err);
			});
		});
	});

	describe("parsing the contacts using the new response format", function () {
		var resultNew;
		var expectedResult;
		var response;
		before(function () {
			expectedResult = [
				{
					contact    : "sip:ringto_user_1495526@187.42.31.10:42817;ob",
					properties :
					{
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
					}
				},
				{
					contact    : "sip:ringto_user_1495526@177.135.168.30:59999;transport=TCP;ob",
					properties :
					{
						Expires      : "94",
						Callid       : "dVYWN9riDOONNlKZKzanWOKlZjIYziYi",
						Cseq         : "65094",
						"User-agent" : "BWSip Framework v1.0",
						Received     : "sip:177.135.168.30:59999",
						State        : "CS_NEW",
						Flags        : "0",
						Cflags       : "",
						Socket       : "tcp:52.4.77.11:9060",
						Methods      : "8063",
						SIP_instance : "<urn:uuid:00000000-0000-0000-0000-00008340d0fa>"
					}
				}
			];
			response = {
				code    : "200",
				message : "OK",
				success : true,
				body    :
				[
					"AOR:: +883511000000755@dev.ringto.bwapp-stage.stage.bwsip.io",
					"\tContact:: sip:ringto_user_1495526@187.42.31.10:42817;ob Q=0.5",
					"\t\tExpires:: 2336",
					"\t\tCallid:: FJas.XiUKJXQGWt4nfpISbRFFwCgWwd5",
					"\t\tCseq:: 43646",
					"\t\tUser-agent:: BWSip Framework v1.0",
					"\t\tReceived:: sip:187.42.31.10:42817",
					"\t\tState:: CS_NEW",
					"\t\tFlags:: 0",
					"\t\tCflags:: ",
					"\t\tSocket:: udp:52.4.77.11:9060",
					"\t\tMethods:: 8063",
					"\tContact:: sip:ringto_user_1495526@177.135.168.30:59999;transport=TCP;ob",
					"\t\tExpires:: 94",
					"\t\tCallid:: dVYWN9riDOONNlKZKzanWOKlZjIYziYi",
					"\t\tCseq:: 65094",
					"\t\tUser-agent:: BWSip Framework v1.0",
					"\t\tReceived:: sip:177.135.168.30:59999",
					"\t\tState:: CS_NEW",
					"\t\tFlags:: 0",
					"\t\tCflags:: ",
					"\t\tSocket:: tcp:52.4.77.11:9060",
					"\t\tMethods:: 8063",
					"\t\tSIP_instance:: <urn:uuid:00000000-0000-0000-0000-00008340d0fa>"
				]
			};
		});
		it("returns the correct Contact Properties", function () {
			resultNew = util.extractContactList(response);
			expect(resultNew).to.deep.equal(expectedResult);
		});
	});
});
