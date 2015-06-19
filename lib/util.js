"use strict";
var ContactRecord = require("./ContactRecord");
var _             = require("lodash");

var util = module.exports = {};

util.extractContactList = function (response) {
	return _.map(response.body, function (line) {
		return ContactRecord.parse(line);
	});
};
