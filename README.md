# Google Maps API for Node.js
A simple way to query the Google Maps API from Node.js

This was a quick hack to work with Node.js.  Criticism/Suggestions/Patches/PullReq's welcome.

# Status
APIs implemented:

* [Geocoding](http://code.google.com/apis/maps/documentation/geocoding/)
* [Directions](http://code.google.com/apis/maps/documentation/directions/)
* [Elevation](http://code.google.com/apis/maps/documentation/elevation/)

TODO:

* [Places](http://code.google.com/apis/maps/documentation/places/)
* [Static Maps](http://code.google.com/apis/maps/documentation/staticmaps/)
* [Tests for everything](./tree/master/test/) (using [vows](http://vowsjs.org/))

# Usage
	var gm = require('googlemaps');
	var sys = require('sys');
	
	gm.reverseGeocode('41.850033,-87.6500523', function(err, data){
		sys.puts(JSON.stringify(data));
	});
	
	gm.reverseGeocode(gm.checkAndConvertPoint([41.850033, -87.6500523]), function(err, data){
		sys.puts(JSON.stringify(data));
	});

Both examples print:
	{"status":"OK","results":[{"types":["postal_code"],"formatted_address":"Chicago, IL 60695, USA"...

All the googlemaps functions follow this scheme:
    function(required, callback, optional)

All callbacks are expected to follow:
    function(error, results)
Where the error returned is an Error object.

Please refer to the code, [tests](./tree/master/test/) and the [Google Maps API docs](http://code.google.com/apis/maps/documentation/webservices/index.html) for further usage information.

