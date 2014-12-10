var mongoose = require('mongoose');
var Update = mongoose.model('Update');

var API_PASSWORD = 'M4EgsuY7PDZi';

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
	// curl -X POST -H "Content-Type: application/json" -d '{ "title": "My title", "description": "Bla bla bla", "reloadNeeded": false }' http://localhost:3002/api/updates?password=[PASSWORD]
	// curl -X POST -H "Content-Type: application/json" -d '{ "title": "Cool new feature!", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a nunc. In ante metus, gravida vel, bibendum et, mollis vitae, ipsum. Sed leo nibh, pulvinar dignissim, pretium eget, mattis id, erat.", "authors": "Henric, Andres", "url": "http://placekitten.com", "imageUrl": "http://placekitten.com/g/300/300", "reloadNeeded": true, "priority": 2 }' http://localhost:3002/api/updates?password=[PASSWORD]
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
	// curl -X DELETE http://localhost:3002/api/updates/5477a6f88906b9fc766c843e?password=[PASSWORD]
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