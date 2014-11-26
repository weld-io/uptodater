var mongoose = require('mongoose');
var Update = mongoose.model('Update');

module.exports = {

	index: function (req, res, next) {

		var searchQuery = {};
		if (req.query.after) {
			searchQuery = { dateCreated: {"$gte": new Date(req.query.after)} };
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
	}

}