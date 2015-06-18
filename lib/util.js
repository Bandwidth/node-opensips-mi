"use strict";
var Contact = require("./Contact");
var _       = require("lodash");

var util = module.exports = {};

util.extractContactList = function (response) {
	return _.map(response.body, function (line) {
		return new Contact(line.split("Contact:: ")[1]);
	});
};
