# UpToDater

UpToDater is an API service for showing the users the latest updates and features in an application. Use it to check if the app has been updated since the last time the user logged or refreshed their browser.

It was inspired by Wufoo's similar service, as described by founder Kevin Hale in [“How to Build Products Users Love”](http://startupclass.samaltman.com/courses/lec07/) in “How to Start a Startup”.

![UpToDater example](example.png)

## Usage

Note: this is currently the **backend only**.

Example:

	curl http://localhost:3002/api/updates?from=1991-01-03

...would return a list of updates since Scorpions released “Wind of Change”, or an empty JSON array if nothing had changed.

## How to Run

Just start with:

	# Set password used in API requests
	export UPTODATER_PASSWORD=MYPASSWORD

	grunt

Server will default to **http://localhost:3002**

## Queries

List new:

	curl http://localhost:3002/api/updates?from=2014-11-28

List all:

	curl http://localhost:3002/api/updates

Add new update:

	curl -X POST -H "Content-Type: application/json" -d '{ "title": "Example feature", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "imageUrl": "https://placekitten.com/g/800/600" }' http://localhost:3002/api/updates?password=MYPASSWORD
	curl -X POST -H "Content-Type: application/json" -d '{ "title": "Minimum post" }' http://localhost:3002/api/updates?password=MYPASSWORD
	curl -X POST -H "Content-Type: application/json" -d '{ "title": "Maximum post", "description": "", "authors": "", "url": "", "imageUrl": "", "dateCreated": "2015-01-01", "reloadNeeded": true, "priority": 1 }' http://localhost:3002/api/updates?password=MYPASSWORD

Edit update:

	curl -X PUT -H "Content-Type: application/json" -d '{ "title": "New name of feature" }' http://localhost:3004/api/updates/5477a6f88906b9fc766c843e?password=MYPASSWORD

Delete update:

	curl -X DELETE http://localhost:3002/api/updates/5477a6f88906b9fc766c843e?password=MYPASSWORD

Delete all:

	curl -X DELETE http://localhost:3002/api/updates/ALL?password=MYPASSWORD

## Data properties

	var UpdateSchema = new Schema({
		title: { type: String, required: true },
		description: String,
		authors: String,
		url: String,
		imageUrl: String,
		dateCreated: { type: Date, default: Date.now, index: true },
		reloadNeeded: { type: Boolean, default: false },
		priority: { type: Number, default: 2 }, // 1-3
		style: {} // CSS styles
	});

## Implementation

UpToDater is based on the [Yeoman Express generator](https://github.com/petecoop/generator-express) with the "MVC" option.

## Deploying on Heroku

	# Set up and configure app
	heroku create MYAPPNAME
	heroku addons:add mongolab
	heroku config:set NODE_ENV=production

	# Set password used in API requests
	heroku config:set UPTODATER_PASSWORD=MYPASSWORD
