'use strict'

exports.getEvents = (req, res) => {
	res.status(200).json(
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
	res.status(200).json(
			{
				'id' : '1',
				'eventname': '42 folies'
			});
}

exports.postEvent = (req, res) => {
	res.status(200).json(
			{
				'id': 'last',
				'eventname': 'new event name'
			});
}

exports.putEventById = (req, res) => {
	res.status(200).json(
			{
				'id': '1',
				'eventname' : 'new event name'
			});
}

exports.deleteEventById = (req, res) => {
	res.status(200).json(
			{
				'deleted': 'success'
			});
}
