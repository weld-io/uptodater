'use strict';

var mongoose = require('mongoose');
var Update = mongoose.model('Update');

module.exports = {

	index: function (req, res, next) {
		Update.find({ dateCreated: { "$lt": new Date() } }).sort({ dateCreated: -1 }).exec(function (err, updates) {
			if (err)
				return next(err);
			res.render('updates/index', {
				title: 'All updates',
				updates: updates
			});
		});
	}

}