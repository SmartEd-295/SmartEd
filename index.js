'use strict';

var express = require('express'),
	kraken = require('kraken-js'),
	bodyParser = require('body-parser'),
	app = express(),
	utility = require('./lib/utility'),
	port = process.env.PORT || 3000;

var options = {
    onconfig: function (config, next) {
    	next(null, config);
    }
};

app.use(kraken(options));
app.use(express.static(__dirname + '/public/app'));

app.listen(port, function (err) {
    console.log('Application ready to serve requests.');
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});

app.on('start', function(){
	 utility.configure();
});

module.exports.app = app;