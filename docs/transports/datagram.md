datagram transport
==================

The `datagram` transport sends and receives commands to `OpenSIPS` using UDP.
A socket is created for every request so that correlating responses with requests
is easier.


### DatagramTransport(options)

Creates a new `Client` class with the specified transport.

  + **transport** -- The name of the transport to use. Only `datagram` supported at this time.
  + **options** -- Hash of options used to create the underlaying transport.

**Options:**
  + **host** -- The hostname of the OpenSIPS service to manage. Defaults to `127.0.0.1`.
  + **port** -- The port the management transport is listening on. Defaults to `8080`.
  + **maxRetries** -- The maximum number retries before failing for any command. Defaults to `3`.
  + **timeout** -- The number of milliseconds after which a request times out. Defaults to `200`.

**Returns** a new `Client` instance
