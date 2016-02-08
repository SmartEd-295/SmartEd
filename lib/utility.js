'use strict';
var mongoose = require('mongoose');
//var nodemailer = require('nodemailer');

var utility = function () {
    return {

    	/*	CONNECT TO MONGO DB USING SPECIFIED CONFIGURATIONS
    	*/
        configure: function () {
        	var app = require('../index').app;
        	var host = app.kraken.get('dataConfig:host'),
        		port = app.kraken.get('dataConfig:port'),
        		database = app.kraken.get('dataConfig:database');
        		
        	var connectionString = 'mongodb://'+host+':'+port+'/'+database;

        	console.log(connectionString);

        	 mongoose.connect(connectionString);
        	 var db = mongoose.connection;
        	 db.on('error', console.error.bind(console, 'connection error:'));
        	 db.once('open', function callback() {
        	     console.log('db connection open');
        	 });

        }


        /* 	SAMPLE CODE TO SEND MAIL USING NODE
        */
        // sendMail: function(fromAddress, toAddress, subject, body){
        	
        // 	var transporter = nodemailer.createTransport({
        // 		service: 'hotmail',
        // 	    auth: {
        // 	        user: 'kunalbarve@outlook.com',
        // 	        pass: 'Mrhunt@168'
        // 	    }
        // 	});
        	
        // 	var mailOptions = {
        // 			from: 'kunalbarve@outlook.com',
        // 			to: 'kunalbarve.16890@gmail.com',
        // 		    subject: 'Hello',
        // 		    html: '<b>Hello. Testing is done</b>'
        // 	};
        	
        // 	transporter.sendMail(mailOptions, function(error, info){
        // 	    if(error){
        // 	    	 console.log("Error type:", error.name);
        // 	         console.log("SMTP log:", error.data);
        // 	    }else{
        // 	        console.log('Message sent: ' + info.response);
        // 	    }
        // 	});
        // }

    };
};

module.exports = utility();