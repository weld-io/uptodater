/**
 * Application routes for REST
 */
var express = require('express');

module.exports = function (app, config) {

	var router = express.Router();
	app.use('/', router);

	// Controllers
	var startController = require(config.root + '/app/controllers/start');
	var apiController = require(config.root + '/app/controllers/api');
	var updatesController = require(config.root + '/app/controllers/updates');

	router.get('/', startController.index);

	router.get('/api', apiController.index);
	
	router.get('/updates', updatesController.index);

};