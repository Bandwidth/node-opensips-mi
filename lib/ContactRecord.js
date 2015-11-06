"use strict";

var CONTACT_REGEX = /(?:[^\s<>;]|<[^>]*>)+/g;
var BRACKET_REGEX = /[^<>]+/g;

function stripBrackets (text) {
	var parts = text.match(BRACKET_REGEX);
	return parts[0];
}

function ContactRecord (contact, properties) {
	this.contact = contact;
	this.properties = properties;
	Object.freeze(this);
}

ContactRecord.parse = function (line) {
	var rawContact = line.split("Contact:: ")[1];
	var match = CONTACT_REGEX.exec(rawContact);
	var contact = stripBrackets(match[0]);
	var properties = {};
	match = CONTACT_REGEX.exec(rawContact);
	while (match) {
		var pair = match[0].split("=");
		properties[pair[0]] = stripBrackets(pair[1]);
		match = CONTACT_REGEX.exec(rawContact);
	}

	return new ContactRecord(contact, properties);
};

module.exports = ContactRecord;