"use strict";
var Util = require("../util");

function UserLocation (transport) {
	this.showContact = function (tableName, addressOfRecord) {
		return transport.command("ul_show_contact", tableName, addressOfRecord)
		.then(function (response) {
			return Util.extractContactList(response);
		});
	};

	Object.freeze(this);
}

UserLocation.namespace = "usrloc";

Object.freeze(UserLocation);

module.exports = UserLocation;
