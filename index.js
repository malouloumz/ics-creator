"use strict"

var fs = require('fs'),
	ics = fs.readFileSync(__dirname + '/template.ics').toString('utf8'),
	libbase64 = require('libbase64')	


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
				'uuid': uuid.substr(uuid.length-9),
				'start': '',
				'end': '',
				'currentTime': ''
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

	createNodemailerAttachment: function createNodemailerAttachment (options, filename) {
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
	