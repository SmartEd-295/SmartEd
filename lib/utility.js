'use strict';
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var config = require('../config/config.json');
var sendgrid  = require('sendgrid')('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');
var utility = function () {

    /* --------------------------------------------------PRIVATE SEND MAIL GENERIC FUNCTION------------------------------------------------------------------------------------------------*/
    var sendMail = function (toAddress, subject, message) {
        var fromAddress = 'smarted2016@gmail.com';
        var email     = new sendgrid.Email({
			to:       toAddress,
			from:    fromAddress,
			subject:  subject,
			html:     message
		  });
		  sendgrid.send(email, function(err, json) {
			if (err) { return console.error(err); }
			console.log(json);
		  });
    };


    /* ----------------------------------------------EXPOSED PUBLIC FUNCTIONS----------------------------------------------------------------------------------------------------*/
    return {

        /* ---------------------------------------------CONNECTION TO REMOTE MONGO INSTANCE-----------------------------------------------------------------------------------------------------*/
        configure: function () {
            var app = require('../index').app;
            var host = app.kraken.get('dataConfig:host'),
                port = app.kraken.get('dataConfig:port'),
                database = app.kraken.get('dataConfig:database'),
                userName = app.kraken.get('dataConfig:userName'),
                pwd = app.kraken.get('dataConfig:password');

            var connectionString = 'mongodb://smarted:smarted@ds023570.mlab.com:23570/smartedlearninganalytics';
            //var connectionString = 'mongodb://' + userName + ':' + pwd + '@' + host + ':' + port + '/' + database;

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

        /* ------------------------------------------------SEND MAIL TO STUDENT ON ACCOUNT CREATION--------------------------------------------------------------------------------------------------*/
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

        /* ------------------------------------------------SEND MAIL TO PROFESSOR FOR ACCOUNT CREATION--------------------------------------------------------------------------------------------------*/
        welcomeProfessorMail: function (toAddress, pass) {
            var url = config.verificationUrl + toAddress;
            var subject = 'Welcome to SmartEd!';
            var message = '<h4>Hello Professor,</h4>' +
                'You are added to SmartEd.' +
                '<br><br>Now you can make use of SmartEd to achieve excellence in your career.' +
                '<br><br>Click the link to activate your account.' +
                '<br><a href="' + url + '">Activate SmartEd</a>' +
                '<br><br>You can use below credentials to login after activating your account:' +
                '<br>UserId: ' + toAddress +
                '<br>Password: ' + pass +
                '<br><br><br><h4>Thanks,</h4>' +
                'SmartEd Team';

            sendMail(toAddress, subject, message);
        },

        /* --------------------------------------------------MAIL FOR TEMPORARY PASSWORD------------------------------------------------------------------------------------------------*/
        resetPassword: function (toAddress, pass) {
            var subject = 'Password reset from SmartEd!';
            var message = '<h4>Hello,</h4>' +
                'You have requested to change your password.' +
                '<br><br>Your temporary password is as below:' +
                '<br>Password: ' + pass +
                '<br><br>Please use this password to select a new one.' +
                '<br><br><br><h4>Thanks,</h4>' +
                'SmartEd Team';

            sendMail(toAddress, subject, message);
        },

        /* -----------------------------------------------CHANGE IN STATUS OF ASSIGNED COURSE SEND MAIL TO PROFESSOR---------------------------------------------------------------------------------------------------*/
        courseStatusChange: function (toAddress, semester, updatedStatus, courseId) {
            var subject = 'SmartEd: Course Status Change';

            var message = '<h4>Hello Professor,</h4>';

            if (updatedStatus === false) {
                message = message + 'You have been removed from the following course.';
            } else {
                message = message + 'You have been assigned to the following course.';
            }

            message = message + '<br><b>Course: </b>' + courseId +
                '<br><b>Term: </b>' + semester +
                '<br><br>*This is a generic update from SmartEd, no additional action required.' +
                '<br><br><br><h4>Thanks,</h4>' +
                'SmartEd Team';

            sendMail(toAddress, subject, message);
        },

        /* ------------------------------------------------------COLLABORATION MAIL--------------------------------------------------------------------------------------------*/
        sendMessageMail: function (toAddress, msgSubject, content) {
            var url = config.verificationUrl + toAddress;
            var subject = msgSubject;
            var message = content;
            sendMail(toAddress, subject, message);
        },

        /* ------------------------------------------------------UTILITY FUNCTION TO GENERATE A VALID TERM FROM CURRENT SEMESTER DETAILS--------------------------------------------------------------------------------------------*/
        getCurrentTerm: function (term, year, isRegular, cb) {
            var start = '2';
            var middle;
            if (isRegular) {
                middle = Number(year.slice(-2));
            } else {
                middle = Number(year.slice(-2)) - 1;
            }
            var end = '';

            switch (term) {
                case 'Spring':
                    end = '2';
                    break;
                case 'Summer':
                    end = '3';
                    break;
                case 'Fall':
                    end = '4';
                    break;
                default:
                    end = '2';
            }

            var semester = start + middle.toString() + end;

            cb(semester);

        }
    };
};

module.exports = utility();
