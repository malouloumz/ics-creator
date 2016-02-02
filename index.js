"use strict"

var fs = require('fs'),
	ics = fs.readFileSync('template.ics').toString('utf8'),
	libbase64 = require('libbase64')	


module.exports = {
	createICS: function (options) {
		var newICS = ics,
			whitelist = {
				'organizerName':'',
				'organizerEmail':'',
				'attendeeName':'',
				'attendeeEmail':'',
				'body':'',
				'subject':'',
				'location':'',
				'uuid': '',
				'start': '',
				'end': '',
				'currentTime': ''
			}

		for (var i in whitelist) {
			newICS = ics.replace('---' + i + '---', (options[i] || whitelist[i]))
		}

		return newICS
	},

	createNodemailerAttachment: : function (options, filename) {
		return {
			filename: (filename || 'event_' + Date().getTime()) + '.ics',
			encoding: 'base64',
			content: libbase64.encode(module.exports.createICS(options)),
			headers: {
				'Content-Transfer-Encoding': 'base64',
				'Content-Type': 'text/calendar; charset="utf-8"; method=REQUEST',
			}
		}
	}
}
	
/*
{
	'organizerName':'Shane Gadsby',
	'organizerEmail':'schme16@gmail.com',
	'attendeeName':'Shane Gadsby',
	'attendeeEmail':'Shane.Gadsby@usq.edu.au',
	'body':'This is just a test - 1',
	'subject':'Test event - 1',
	'location':'the ether - 1',
	'uuid': String(new Date().getTime()).substr(0,9),
	'start': Date.create().toISOString().replace(/-|:/g, '').slice(0, 13).concat('00Z'),
	'end': Date.create().addMinutes(30).toISOString().replace(/-|:/g, '').slice(0, 13).concat('00Z'),
	'currentTime': Date.create().toISOString().replace(/-|:/g, '').slice(0, 13).concat('00Z')
}
*/	