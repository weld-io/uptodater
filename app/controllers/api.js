var mongoose = require('mongoose');
var Update = mongoose.model('Update');

module.exports = {

	list: function (req, res, next) {

		var searchQuery = {};
		if (req.query.from) {
			searchQuery = { dateCreated: {"$gte": new Date(req.query.from)} };
		}
		console.log('API', searchQuery);

		Update.find(searchQuery, null, { sort: {dateCreated: 1} }, function (err, updates) {
			if (err) {
				return res.json(400, err);
			}
			else {
				return res.json(updates);
			}
		});
	},

	// Create new update
	// curl -X POST -H "Content-Type: application/json" -d '{ "title": "My title", "text": "Bla bla bla", "reloadNeeded": false }' http://localhost:3002/api/updates
	create: function (req, res, next) {
		var newUpdate = new Update(req.body);
		newUpdate.save(function (err) {
			if (err) {
				return res.json(400, err);
			}
			else {
				return res.json(newUpdate);
			}
		});
	},

	// Delete update
	// curl -X DELETE http://localhost:3002/api/updates/5477a6f88906b9fc766c843e
	delete: function (req, res, next) {
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

}