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

	// curl -X POST -H "Content-Type: application/json" -d '{ "title": "My title", "text": "Bla bla bla", "reloadNeeded": false }' http://localhost:3002/api/updates
	create: function (req, res, next) {
		console.log('CREATE', req.body);
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

}