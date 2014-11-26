# uptodater

Checks if a service has been updated since given timestamp

Like this:

	curl http://uptodater.com/web?1991-01-03T04:05+01:00

Would return a list of updates to "Web" since Scorpions released "Wind of Change" or 304 if nothing had changed.

## Implementation

Based on the [Yeoman Express generator](https://github.com/petecoop/generator-express) with the "MVC" option.

## How to Run

Just start with:

	grunt

Server will default to **http://localhost:3002**