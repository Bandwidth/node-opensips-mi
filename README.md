node-opensips-mi [![Build Status](https://travis-ci.org/inetCatapult/node-opensips-mi.svg?branch=master)](https://travis-ci.org/inetCatapult/node-opensips-mi)
================

> A Node client library for the OpenSIPS management interface.

	npm install opensips-mi

### Example
```javascript
var opensips = require("opensips-mi");
var client = opensips.create("datagram", { host : "38.29.39.19" });

client.usrloc.showContact("location", "sip:tester@testing-domain.com")
.then(function (contacts) {
	// do something with the list of contacts
})
.error(function (error) {
	// do something to handle the error
});
```

Look in the [documentation](./docs) for more information.
