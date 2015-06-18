"use strict";

var CONTACT_REGEX = /(?:[^\s<>;]|<[^>]*>)+/g;
var BRACKET_REGEX = /[^<>]+/g;

function stripBrackets (text) {
	var parts = text.match(BRACKET_REGEX);
	return parts[0];
}

function Contact (line) {
	var match = CONTACT_REGEX.exec(line);
	this.contact = stripBrackets(match[0]);
	match = CONTACT_REGEX.exec(line);
	while (match) {
		var pair = match[0].split("=");
		this[pair[0]] = stripBrackets(pair[1]);
		match = CONTACT_REGEX.exec(line);
	}

	Object.freeze(this);
}

Object.freeze(Contact);

module.exports = Contact;
