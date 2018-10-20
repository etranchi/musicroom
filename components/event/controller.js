'use strict'

exports.getEvents = (req, res) => {
	res.json(200,
			[
				{
					'id': '1',
					'eventname' : '42 folies'
				},
				{
					'id': '2',
					'eventname':'42 folies 2'
				}
			]);
}

exports.getEventById = (req, res) => {
	res.json(200,
			{
				'id' : '1',
				'eventname': '42 folies'
			});
}

exports.postEvent = (req, res) => {
	res.json(200,
			{
				'id': 'last',
				'eventname': 'new event name'
			});
}

exports.putEventById = (req, res) => {
	res.json(
			{
				'id': '1',
				'eventname' : 'new event name'
			});
}

exports.deleteEventById = (req, res) => {
	res.json(200, 
			{
				'deleted': 'success'
			});
}
