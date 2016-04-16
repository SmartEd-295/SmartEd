'use strict';

var UserModel = require('../../models/user'),
    constant = require('../../lib/constants'),
    utility = require('../../lib/utility'),
    sessionFilter = require('../../lib/sessionFilter'),
    canvasConnectivity = require('../../lib/canvasAPI'),
    config = require('../../config/config.json');

module.exports = function (router) {

    var User = new UserModel();


    /*	CREATE A NEW USER
     */
    router.post('/register', function (req, res) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var password = req.body.password;
        var studentId = req.body.studentId;

        var hash = new Buffer(password).toString('base64');

        if (email.indexOf(constant.MESSAGE_MAP.get("DOMAIN")) > -1) {
            userExist(email, function (error, doc) {
                if (error || doc == null) {
                    User.create({
                        role: constant.MESSAGE_MAP.get("STUDENT_ROLE"),
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        sjsuId: studentId,
                        isVerified: false,
                        password: hash
                    }, function (err, doc) {
                        if (err) {
                            console.log(err);
                            res.status(400).send(constant.MESSAGE_MAP.get("REGISTER_FAILED"));
                        }
                        else {
                            res.status(200).send(constant.MESSAGE_MAP.get("REGISTER_SUCCESS"));
                            utility.welcomeMail(email);
                        }
                    });
                } else {
                    if (doc.isVerified) {
                        res.status(400).send(constant.MESSAGE_MAP.get("USER_REGISTERED"));
                    } else {
                        res.status(400).send(constant.MESSAGE_MAP.get("USER_NEEDS_VERIFICATION"));
                        utility.welcomeMail(email);
                    }
                }
            });
        } else {
            res.status(400).send(constant.MESSAGE_MAP.get("REGISTER_INVALID_EMAIL"));
        }
    });


    /*	VERIFY THE USER TRYING TO LOG IN
     */
    router.post('/signin', function (req, res) {
        var userEmail = req.body.email;
        var password = req.body.password;

        userExist(userEmail, function (error, doc) {
            if (error || doc == null) {
                res.status(401).send(constant.MESSAGE_MAP.get("USER_NOT_EXIST"));
            } else {
                var encryptedPassword = new Buffer(password).toString('base64');
                if (encryptedPassword == doc.password && doc.isVerified) {
                    req.session.smartedVisitId = new Buffer(userEmail).toString('base64');
                    req.session.userEmail = userEmail;

                    canvasConnectivity.getCanvasDetails(constant.MESSAGE_MAP.get("GET_COURSE_DETAILS"), req.session.userEmail);

                    res.json(doc);
                } else {
                    res.status(401).send(constant.MESSAGE_MAP.get("LOGIN_FAILED"));
                }
            }
        });

    });

    router.post('/registerProfessor', function (req, res) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var password = req.body.password;
        var professorId = req.body.professorId;
        var courseName = req.body.courseName;
        var courseId = req.body.courseId;

        var hash = new Buffer(password).toString('base64');

        if (email.indexOf(constant.MESSAGE_MAP.get("DOMAIN")) > -1) {
            userExist(email, function (error, doc) {
                if (error || doc == null) {
                    User.create({
                        role: constant.MESSAGE_MAP.get("STUDENT_ROLE"),
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        sjsuId: professorId,
                        isVerified: false,
                        password: hash
                    }, function (err, doc) {
                        if (err) {
                            console.log(err);
                            res.status(400).send(constant.MESSAGE_MAP.get("REGISTER_FAILED"));
                        }
                        else {
                            res.status(200).send(constant.MESSAGE_MAP.get("REGISTER_SUCCESS"));
                            utility.welcomeMail(email);
                        }
                    });
                }
            });
        } else {
            res.status(400).send(constant.MESSAGE_MAP.get("REGISTER_INVALID_EMAIL"));
        }
    });

    router.get('/verifyUser', function (req, res) {
        var emailAddress = req.query.email;
        var applicationUrl = config.applicationUrl;
        User.update({email: emailAddress}, {$set: {isVerified: true}}, function (err, doc) {
            if (err || doc == null) {
                res.send("<center><br><br><h3>Some error occured in verification, please try again.</h3></center>");
            }
            else {
                res.send("<center><br><br><br><h3>Email address verified.</h3>" +
                    "<br><a href='" + applicationUrl + "'>Login!</a>" +
                    "</center>");
            }
        });
    });

    function userExist(email, cb) {
        User.findOne({email: email}, function (err, doc) {
            cb(err, doc);
        });
    }
};
