usrloc
======

### UserLocation(options)

Creates a new `UserLocation` class with the specified options.

  + **options** -- Hash of options used to create the underlaying transport.

**Options:**
  + **host** -- The hostname of the OpenSIPS service to manage. Defaults to `127.0.0.1`.
  + **port** -- The port the management transport is listening on. Defaults to `8080`.
  + **maxRetries** -- The maximum number retries before failing for any command. Defaults to `3`.
  + **timeout** -- The number of milliseconds after which a request times out. Defaults to `200`.

**Returns** a new `UserLocation` instance

### usrloc.showContact(tableName, addressOfRecord)

Retrieves the contact information for the specified address of record.

  + **tableName** -- The name of the database table where contacts are stored by OpenSIPS.
  + **addressOfRecord** -- The address of record being looked up. A SIP URI.

**Returns** A promise that is resolved with the list of contacts or rejected with an error

example resolution value:
```javascript
[ { contact: 'sip:dude@177.135.168.30:44444;line=c12f27fadc3333f',
    q: '0.5',
    expires: '3291',
    flags: '0x0',
    cflags: '0x0',
    socket: 'udp:44.4.44.14:3938',
    methods: '0xFFFFFFFF',
    received: 'sip:177.135.168.30:44444',
    user_agent: 'Linphone/3.6.1 (eXosip2/4.0.0)' } ]
```
