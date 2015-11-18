responses
=========

The new response to the request  `ul_show_contact`, that the old function wasnt being able to parse and now is being parsed in the file `/lib/ContactRecordv2.js`, looks like the one below:

code : "200",
message : "OK",
success : true,
body    :
[
"AOR:: +883511000000755@dev.ringto.bwapp-stage.stage.bwsip.io",
"	Contact:: sip:ringto_user_1495526@187.42.31.10:42817;ob Q=0.5",
"		Expires:: 2336",
"		Callid:: FJas.XiUKJXQGWt4nfpISbRFFwCgWwd5",
"		Cseq:: 43646",
"		User-agent:: BWSip Framework v1.0",
"		Received:: sip:187.42.31.10:42817",
"		State:: CS_NEW",
"		Flags:: 0",
"		Cflags:: ",
"		Socket:: udp:52.4.77.11:9060",
"		Methods:: 8063",
"	Contact:: sip:ringto_user_1495526@177.135.168.30:59999;transport=TCP;ob Q=0.5",
"		Expires:: 94",
"		Callid:: dVYWN9riDOONNlKZKzanWOKlZjIYziYi",
"		Cseq:: 65094",
"		User-agent:: BWSip Framework v1.0",
"		Received:: sip:177.135.168.30:59999",
"		State:: CS_NEW",
"		Flags:: 0",
"		Cflags:: ",
"		Socket:: tcp:52.4.77.11:9060",
"		Methods:: 8063",
"		SIP_instance:: <urn:uuid:00000000-0000-0000-0000-00008340d0fa>"
]

The old one, that still being parsed at `/lib/ContactRevord.js` looks like this:

200 OK
Contact:: <sip:tester@177.135.168.30:37225;line=004d205e4461132>;q=0.5;expires=3252;flags=0x0;cflags=0x0;socket=<udp:52.4.77.11:5060>;methods=0xFFFFFFFF;received=<sip:177.135.168.30:37225>;user_agent=<Linphone/3.6.1 (eXosip2/4.0.0)>
Contact:: <sip:tester@177.135.168.30:37225;line=004d205e4461132>;q=0.5;expires=3252;flags=0x0;cflags=0x0;socket=<udp:52.4.77.11:5060>;methods=0xFFFFFFFF;received=<sip:177.135.168.30:37225>;user_agent=<Linphone/3.6.1 (eXosip2/4.0.0)>
Contact:: <sip:tester@177.135.168.30:37225;line=004d205e4461132>;q=0.5;expires=3252;flags=0x0;cflags=0x0;socket=<udp:52.4.77.11:5060>;methods=0xFFFFFFFF;received=<sip:177.135.168.30:37225>;user_agent=<Linphone/3.6.1 (eXosip2/4.0.0)>
