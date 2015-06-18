client
======

The `Client` class glues everything together in a convenient way.
Creating a client will set up the transport specified and provide
convenience methods for `mi` functions exported by `OpenSIPS` modules.

Creating a client looks like this:

### Client.create(transport, options)

Creates a new `Client` class with the specified transport and options.

  + **transport** -- The name of the transport to use. Only `datagram` supported at this time.
  + **options** -- Hash of options used to create the underlaying transport.

**Options:**
  + **host** -- The hostname of the OpenSIPS service to manage. Defaults to `127.0.0.1`.
  + **port** -- The port the management transport is listening on. Defaults to `8080`.
  + **maxRetries** -- The maximum number retries before failing for any command. Defaults to `3`.
  + **timeout** -- The number of milliseconds after which a request times out. Defaults to `200`.

**Returns** a new `Client` instance

### client.command(name, args...)

Sends any command and its arguments to the `OpenSIPS` management interface.

  + **name** -- The name of the command to send.
  + **args** -- Arguments for the specified command as a variadic argument.

ex: `client.command("ul_show_contact", "location", "sip:test@test.com")`

**Returns** A promise that is resolved with the `Response` or rejected with an error.

Convenience methods for each supported `OpenSIPS` module will be exposed in their own respective
namespaces on the client. Here is one for the `usrloc` module:

```javascript
client.usrloc.showContact(tableName, addressOfRecord)
.then(function (contacts) {
	// do cool stuff with already parsed JSON
})
.error(function (error) {
	// handle error
});
```

The convenience is having the contacts returned to you as JSON, fully parsed. This is preferred
to using the `command` method, which returns the raw response. For example:

```javascript
client.command("ul_show_contact", "location", "sip:test@test.com")
.then(function (response) {
	// do miserable parsing of the response body :(
})
.error(function (error) {
	// handle error
});
```
