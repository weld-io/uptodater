'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Update = mongoose.model('Update');

var API_PASSWORD = process.env.UPTODATER_PASSWORD;

module.exports = {

	list: function (req, res, next) {
		var searchQuery = {};

		// /api/updates?all=true
		if (!req.query.all) {
			const currentTime = new Date();
			_.set(searchQuery, 'dateCreated.$lt', currentTime);
		}

		// /api/updates?from=2015-01-01
		if (req.query.from) {
			_.set(searchQuery, 'dateCreated.$gte', new Date(req.query.from));
		}

		const sorting = { sort: { dateCreated: -1 } };

		Update.find(searchQuery, null, sorting, function (err, updates) {
			if (err) {
				return res.json(400, err);
			}
			else {
				return res.json(updates);
			}
		});
	},

	// Create new update
	create: function (req, res, next) {
		if (req.query.password === API_PASSWORD) {
			var newUpdate = new Update(req.body);
			newUpdate.save(function (err) {
				if (err) {
					return res.json(400, err);
				}
				else {
					return res.json(newUpdate);
				}
			});
		}
		else {
			return res.json(401, 'Unauthorized');
		}
	},

	// Update update (!)
	update: function (req, res, next) {
		Update.update(
			{ _id: req.params.id },
			req.body,
			function (updateErr, numberAffected, rawResponse) {
				if (updateErr) {
					res.json(500, updateErr);
				}
				else {
					res.json(200, 'Updated update ' + req.params.id);
				}
			}
		);
	},

	// Delete update
	delete: function (req, res, next) {
		if (req.query.password === API_PASSWORD) {
			var searchParams;
			if (req.params.id === 'ALL') {
				searchParams = {};
			}
			else {
				searchParams = { _id: req.params.id }
			}

			Update.remove(
				searchParams,
				function(updateErr, numberAffected, rawResponse) {
					if (updateErr) {
						res.json(500, updateErr);
					}
					else {
						res.json(200, 'Deleted ' + numberAffected + ' updates');
					}
				}
			);
		}
		else {
			return res.json(401, 'Unauthorized');
		}
	}

}