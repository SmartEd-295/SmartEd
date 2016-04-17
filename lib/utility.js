'use strict';
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var config = require('../config/config.json');

var utility = function () {

    //--------------------------------------- PRIVATE FUNCTIONS------------------------------------------------
    var sendMail = function(toAddress, subject, message){
        var fromAddress = 'smarted2016@gmail.com';
        var password = 'smarted@2016';

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: fromAddress,
                pass: password
            }
        });

        var mailOptions = {
            from: fromAddress,
            to: toAddress,
            subject: subject,
            html: message
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('Error type:', error.name);
                console.log('SMTP log:', error.data);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    };


    //--------------------------------------- EXPOSED FUNCTIONS------------------------------------------------
    return {

        /*	CONNECT TO MONGO DB USING SPECIFIED CONFIGURATIONS
         */
        configure: function () {
            var app = require('../index').app;
            var host = app.kraken.get('dataConfig:host'),
                port = app.kraken.get('dataConfig:port'),
                database = app.kraken.get('dataConfig:database'),
                userName = app.kraken.get('dataConfig:userName'),
                pwd = app.kraken.get('dataConfig:password');

            var connectionString = 'mongodb://' + userName + ':' + pwd + '@' + host + ':' + port + '/' + database;

            console.log(connectionString);

            mongoose.connect(connectionString);
            var db = mongoose.connection;
            db.on('error', function callback() {
                console.log(' DB Connection Error');
            });
            db.on('connected', function callback() {
                console.log(' DB Connection Connected');
            });
            db.on('disconnected', function callback() {
                console.log(' DB Connection Disconnected');
            });
            db.on('close', function callback() {
                console.log(' DB Connection Closed');
            });
            db.on('reconnected', function callback() {
                console.log(' DB Connection Reconnected');
            });
            db.on('fullsetup', function callback() {
                console.log(' DB Connection Full Setup');
            });
            db.on('open', function callback() {
                console.log(' DB Connection Open');
            });

        },

        welcomeStudentMail: function (toAddress) {
            var url = config.verificationUrl + toAddress;
            var subject = 'Welcome to SmartEd!';
            var message = '<h4>Hello!!</h4>' +
                'You are one step closer to get smart with SmartEd.' +
                '<br><br>Now you can make use of SmartEd to achieve excellence in your career.' +
                '<br><br>Click the link to activate your account.' +
                '<br><a href="' + url + '">Activate SmartEd</a>' +
                '<br><br><br><h4>Thanks,</h4>' +
                'SmartEd Team';

            sendMail(toAddress, subject, message);
        },

        welcomeProfessorMail: function (toAddress, pass) {
            var url = config.verificationUrl + toAddress;
            var subject = 'Welcome to SmartEd!';
            var message = '<h4>Hello Professor,</h4>' +
                'You are added to SmartEd.' +
                '<br><br>Now you can make use of SmartEd to achieve excellence in your career.' +
                '<br><br>Click the link to activate your account.' +
                '<br><a href="' + url + '">Activate SmartEd</a>' +
                '<br><br>You can use below credentials to login after activating your account:' +
                '<br>UserId: '+toAddress+
                '<br>Password: '+pass+
                '<br><br><br><h4>Thanks,</h4>' +
                'SmartEd Team';

            sendMail(toAddress, subject, message);
        },

        resetPassword: function (toAddress, pass) {
            var subject = 'Password reset from SmartEd!';
            var message = '<h4>Hello,</h4>' +
                'You have requested to change your password.' +
                '<br><br>Your temporary password is as below:'+
                '<br>Password: '+pass+
                '<br><br>Please use this password to select a new one.'+
                '<br><br><br><h4>Thanks,</h4>' +
                'SmartEd Team';

            sendMail(toAddress, subject, message);
        }


    };
};

module.exports = utility();
