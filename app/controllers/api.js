'use strict';

var mongoose = require('mongoose');
var Update = mongoose.model('Update');

var API_PASSWORD = process.env.UPTODATER_PASSWORD;

module.exports = {

	list: function (req, res, next) {
		var searchQuery = {};
		if (req.query.from) {
			var currentTime = new Date();
			searchQuery = { dateCreated: { "$gte": new Date(req.query.from), "$lt": currentTime } };
		}

		Update.find(searchQuery, null, { sort: { priority: 1, dateCreated: -1 } }, function (err, updates) {
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

	// Delete update
	delete: function (req, res, next) {
		if (req.query.password === API_PASSWORD) {
			var searchParams;
			if (req.params.id === 'ALL') {
				searchParams = {};
			}
			else {
				{ _id: req.params.id }
			}

			Update.remove(
				searchParams,
				function(updateErr, numberAffected, rawResponse) {
					if (updateErr) {
						res.json(500, updateErr);
					}
					else {
						res.json(200, 'Deletion complete');
					}
				}
			);
		}
		else {
			return res.json(401, 'Unauthorized');
		}
	}

}