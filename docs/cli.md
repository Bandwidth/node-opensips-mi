nomi cli
========

The `nomi` cli exists mostly as a means to test new functionality in an actual tool.
Any `OpenSIPS` management interface command can be used and raw output printed to console
by using the `nomi command <name> [args]` command.

Ex:
	`nomi command ul_show_contact location sip:test@testing-domain.com`

For help using the cli run:
	`nomi help` or `nomi --help`
