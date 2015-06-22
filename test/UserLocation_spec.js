"use strict";
var Bluebird = require("bluebird");
var expect   = require("chai").expect;
var Sinon    = require("sinon");

var Response     = require("../lib/Response");
var UserLocation = require("../lib/modules/UserLocation");
var util         = require("../lib/util");

describe("The UserLocation module", function () {
	describe("showing contacts", function () {
		var command;
		var extractContactList;
		var usrloc;

		var table = "location";
		var aor = "sip:tester@testing.com";
		var response = new Response(200, "OK", []);

		before(function (done) {
			extractContactList = Sinon.stub(util, "extractContactList");
			command = Sinon.stub();
			command.withArgs("ul_show_contact", table, aor).returns(Bluebird.resolve(response));

			var transport = {
				command : command
			};

			usrloc = new UserLocation(transport);
			usrloc.showContact(table, aor).nodeify(done);
		});

		after(function () {
			command.reset();
			extractContactList.restore();
		});

		it("invokes the command using specified transport", function () {
			expect(command.calledOnce, "called more than once").to.be.true;
			expect(command.calledWith("ul_show_contact", table, aor), "incorrect args").to.be.true;
		});

		it("extracts the contact list from the resulting response", function () {
			expect(extractContactList.calledOnce, "called more than once").to.be.true;
			expect(extractContactList.calledWith(response), "incorrect arg").to.be.true;
		});
	});
});
