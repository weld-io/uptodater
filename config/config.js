var path = require('path'),
		rootPath = path.normalize(__dirname + '/..'),
		env = process.env.NODE_ENV || 'development';

var config = {
	development: {
		root: rootPath,
		app: {
			name: 'uptodater'
		},
		port: 3002,
		db: 'mongodb://localhost/uptodater-development'
		
	},

	test: {
		root: rootPath,
		app: {
			name: 'uptodater'
		},
		port: 3000,
		db: 'mongodb://localhost/uptodater-test'
		
	},

	production: {
		root: rootPath,
		app: {
			name: 'uptodater'
		},
		port: 3000,
		db: 'mongodb://localhost/uptodater-production'
		
	}
};

module.exports = config[env];