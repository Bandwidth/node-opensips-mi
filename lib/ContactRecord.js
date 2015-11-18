"use strict";
function ContactRecord (contact, properties) {
	this.contact = contact;
	this.properties = properties;
	Object.freeze(this);
}

/**
 * Parse a line that contains full information of a single contact, and
 * return a ContactRecord created with the parsed information.
 * @params fullContactLine - full information of a single contact.
 */
ContactRecord.parse = function (fullContactLine) {
	var properties = {};
	var lines = fullContactLine.split("\n");
	var parseLine  = lines[0];

	//"Q" is a property that is inline with the contact so it needs a special treatment
	var qPair = parseLine.split("Q=");
	if (qPair[1]) {
		properties.Q = qPair[1];
	}
	parseLine = qPair[0];
	var contact = parseLine.split("Contact:: ")[1].trim();

	//Adds a new property to "properties" in every iteration,
	//which will be used to create a new ContactRecord.
	for (var i = 1; i < lines.length; i += 1) {
		var pair = lines[i].split(":: ");
		properties[pair[0].trim()] = pair[1];
	}
	return new ContactRecord(contact, properties);
};

module.exports = ContactRecord;