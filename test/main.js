#!/usr/bin/env node

var DDJC = require("ddjc");

DDJC.getDDJC(function(ddjcs) {
	console.log(ddjcs);
});

