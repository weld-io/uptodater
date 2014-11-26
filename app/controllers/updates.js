var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Update = mongoose.model('Update');

module.exports = function (app) {
	app.use('/', router);
};

router.get('/updates', function (req, res, next) {

	Update.find(function (err, updates) {
		if (err) return next(err);
		res.render('index', {
			title: 'Generator-Express MVC',
			updates: updates
		});
	});
	
});