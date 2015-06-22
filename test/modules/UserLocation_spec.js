"use strict";
var expect = require("chai").expect;

var UserLocation = require("../../lib/modules/UserLocation");

describe("The UserLocation module class", function () {
	it("cannot be modified at runtime", function () {
		expect(function () {
			UserLocation.shouldFail = "fail";
		}).to.throw(/object is not extensible/);
	});
});
