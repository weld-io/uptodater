var mongoose = require('mongoose');
var Update = mongoose.model('Update');

module.exports = {

	list: function (req, res, next) {
		var searchQuery = {};
		if (req.query.from) {
			var currentTime = new Date();
			searchQuery = { dateCreated: { "$gte": new Date(req.query.from), "$lt": currentTime } };
		}

		Update.find(searchQuery, null, { sort: {dateCreated: -1} }, function (err, updates) {
			if (err) {
				return res.json(400, err);
			}
			else {
				return res.json(updates);
			}
		});
	},

	// Create new update
	// curl -X POST -H "Content-Type: application/json" -d '{ "title": "My title", "description": "Bla bla bla", "reloadNeeded": false }' http://localhost:3002/api/updates?password=M4EgsuY7PDZi
	create: function (req, res, next) {
		if (req.query.password === 'M4EgsuY7PDZi') {
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
	// curl -X DELETE http://localhost:3002/api/updates/5477a6f88906b9fc766c843e?password=M4EgsuY7PDZi
	delete: function (req, res, next) {
		if (req.query.password === 'M4EgsuY7PDZi') {
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