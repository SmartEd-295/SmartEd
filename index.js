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
app.use("/bower_components", express.static(__dirname+ '/public/bower_components'));


app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

app.listen(app.get('port'), app.get('ip'), function () {
  console.log( "Listening on " + app.get('ip') + ", server_port " + app.get('port') )
});

app.on('start', function(){
	 utility.configure();
});

module.exports.app = app;
