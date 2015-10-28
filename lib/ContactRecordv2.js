"use strict";
var CONTACT_REGEX = /(?:[^\t<>]|<[^>]*>)+/g;
var BRACKET_REGEX = /[^<>]+/g;

function stripBrackets (text) {
	var parts = text.match(BRACKET_REGEX);
	return parts[0];
}

function ContactRecordv2 (contact, properties) {
	this.contact = contact;
	this.properties = properties;
	Object.freeze(this);
}
/*
* Parse a line that contains full information of a single contact, and
*	return a ContactRecord created with the parsed information.
* @params line - full information of a single contact.
*/
ContactRecordv2.parse = function (line) {
	var match = CONTACT_REGEX.exec(line);
	var contact = stripBrackets(match[0].trim());
	var properties = {};
	match = CONTACT_REGEX.exec(line);
	while (match) {
		var pair = match[0].split("=");
		if (pair[0] !== "Cflags") {
			pair[1] = pair[1].trim();
		}
		properties[pair[0]] = stripBrackets(pair[1]);
		match = CONTACT_REGEX.exec(line);
	}
	return new ContactRecordv2(contact, properties);
};

module.exports = ContactRecordv2;