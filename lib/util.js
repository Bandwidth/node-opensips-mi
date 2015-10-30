"use strict";
var ContactRecord   = require("./ContactRecord");
var ContactRecordv2 = require("./ContactRecordv2");
var _               = require("lodash");

var util = module.exports = {};

/**
 * Concatenate the response in order to send a full contact to the parser.
 * To check both the old and the new formats of the response, access /lib
 * @params response - the response from the opensips server, containing
 * all the contacts required.
 */
util.extractContactList = function (response) {
	if (response.body[0].search("AOR") === -1) {
		return _.map(response.body, function (line) {
			return ContactRecord.parse(line);
		});
	}
	else {
		var contacts = [];
		var concatString = response.body[1];
		for (var i = 2; i < response.body.length; i = i + 1){
			if (response.body[i].search("Contact:: ") !== -1) {
				contacts.push(concatString);
				concatString = response.body[i];
			}
			else {
				concatString = concatString + "\n" + response.body[i];
			}
		}
		contacts.push(concatString);
		return _.map(contacts, function (contact) {
			return new ContactRecordv2.parse(contact);
		});
	}
};
