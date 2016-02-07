"use strict"

var fs = require('fs'),
	ics = fs.readFileSync(__dirname + '/template.ics').toString('utf8')


module.exports = {
	createICS: function createICS (options) {
		var newICS = ics,
			uuid = String((new Date()).getTime()),
			whitelist = {
				'organizerName':'',
				'organizerEmail':'',
				'attendeeName':'',
				'attendeeEmail':'',
				'body':'',
				'subject':'',
				'location':'',
				'uuid': '123456789',
				'status': 'CONFIRMED',
				'start': '',
				'end': '',
				'method': 'REQUEST',
				'attach': '',
				'comment': '',
				'sequence': '0',
				'currentTime': '',
			}


		options.start = module.exports.createDateTime(options.start || new Date())
		options.end = module.exports.createDateTime(options.end || new Date())
		options.currentTime = module.exports.createDateTime(options.currentTime || new Date())


		for (var i in whitelist) {
			newICS = newICS.replace('---' + i + '---', (options[i] || whitelist[i]))
		}

		return newICS
	},

	createDateTime: function createDateTime (date) {
		return date.toISOString().replace(/-|:/g, '').slice(0, 13).concat('00Z')
	},	

	createNodemailerEvent: function createNodemailerAttachment (options) {
		return {
			method: options.method,
			content: module.exports.createICS(options)
		}
	}
}
	
/*Very basic example*/
/*
	ics.createNodemailerEvent({
		'organizerName':'Shane Gadsby',
		'organizerEmail':'schme16@gmail.com',
		'attendeeName':'Shane Gadsby',
		'attendeeEmail':'Shane.Gadsby@usq.edu.au',
		'body':'This is just a test - 1',
		'subject':'Test event - 1',
		'location':'the ether - 1',
		'uuid': String(new Date().getTime()).substr(0,-9),
		'start': Date.create(),
		'end': Date.create().addMinutes(30),
		'currentTime': Date.create()
	},'event')
*/	