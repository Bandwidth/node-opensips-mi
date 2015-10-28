"use strict";
var ContactRecord   = require("./ContactRecord");
var ContactRecordv2 = require("./ContactRecordv2");
var _               = require("lodash");

var util = module.exports = {};

util.extractContactList = function (response) {
	return _.map(response.body, function (line) {
		return ContactRecord.parse(line);
	});
};

util.extractContactListUpdated = function (response) {
	if (response.body[0].search("AOR") === -1) {
		return _.map(response.body, function (line) {
			return ContactRecord.parse(line);
		});
	}
	else {
		var concatString = response.body[1];
		for (var i = 2; i < response.body.length; i = i + 1){
			concatString = concatString + " " + response.body[i];
		}
		var splitStrings = concatString.split("Contact:: ");
		splitStrings.shift();
		for (var k = 0; k < splitStrings.length; k = k + 1){
			splitStrings[k] = splitStrings[k].replace(" Q="," \t\tQ=");
			for (var j = 0; j < 11; j = j + 1){
				splitStrings[k] = splitStrings[k].replace(":: ","=");
			}
		}
		return _.map(splitStrings, function (line) {
			return new ContactRecordv2.parse(line);
		});
	}
};
