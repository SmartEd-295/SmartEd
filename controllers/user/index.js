'use strict';

var User = require('../../models/user'),
    constant = require('../../lib/constants'),
    utility = require('../../lib/utility'),
    canvasConnectivity = require('../../lib/canvasAPI'),
    config = require('../../config/config.json'),
    crypto = require('crypto'),
    base64url = require('base64url');

module.exports = function (router) {

    /* ----------------------------------------------------ADD A NEW STUDENT----------------------------------------------------------------------------------------------*/
    router.post('/register', function (req, res) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var password = req.body.password;
        var studentId = req.body.studentId;

        var hash = new Buffer(password).toString('base64');

        email = email.toLowerCase();
        if (email.indexOf(constant.MESSAGE_MAP.get('DOMAIN')) > -1) {
            userExist(email, function (error, doc) {
                if (error || doc === null) {
                    User.create({
                        role: constant.MESSAGE_MAP.get('STUDENT_ROLE'),
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        sjsuId: studentId,
                        isVerified: false,
                        password: hash
                    }, function (err, doc) {
                        if (err) {
                            res.status(400).send(constant.MESSAGE_MAP.get('REGISTER_FAILED'));
                        }
                        else {
                            res.status(200).send(constant.MESSAGE_MAP.get('REGISTER_SUCCESS'));
                            utility.welcomeStudentMail(email);
                        }
                    });
                } else {
                    if (doc.isVerified) {
                        res.status(400).send(constant.MESSAGE_MAP.get('USER_REGISTERED'));
                    } else {
                        res.status(400).send(constant.MESSAGE_MAP.get('USER_NEEDS_VERIFICATION'));
                        utility.welcomeStudentMail(email);
                    }
                }
            });
        } else {
            res.status(400).send(constant.MESSAGE_MAP.get('REGISTER_INVALID_EMAIL'));
        }
    });


    /* ------------------------------------------------------------VERIFY LOGGED IN USER-----------------------------------------------------------------------------------------*/
    router.post('/signin', function (req, res) {
        var userEmail = req.body.email;
        var password = req.body.password;

        userEmail = userEmail.toLowerCase();
        userExist(userEmail, function (error, doc) {
            if (error || doc === null) {
                res.status(401).send(constant.MESSAGE_MAP.get('USER_NOT_EXIST'));
            } else {
                var encryptedPassword = new Buffer(password).toString('base64');
                if (encryptedPassword === doc.password && doc.isVerified) {
                    req.session.smartedVisitId = new Buffer(userEmail).toString('base64');
                    req.session.userEmail = userEmail;

                    //canvasConnectivity.getCanvasDetails(constant.MESSAGE_MAP.get('GET_COURSE_DETAILS'), req.session.userEmail);

                    res.json(doc);
                } else if (encryptedPassword !== doc.password) {
                    res.status(401).send(constant.MESSAGE_MAP.get('LOGIN_FAILED_WRONG_PASSWORD'));
                } else if (!doc.isVerified) {
                    res.status(401).send(constant.MESSAGE_MAP.get('LOGIN_FAILED_ACCOUNT_NOT_ACTIVATED'));
                }
            }
        });
    });

    /* --------------------------------------------------------------ADD NEW PROFESSOR---------------------------------------------------------------------------------------*/
    router.post('/registerProfessor', function (req, res) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var password = req.body.password;
        var professorId = req.body.professorId;

        var hash = new Buffer(password).toString('base64');
        email = email.toLowerCase();
        if (email.indexOf(constant.MESSAGE_MAP.get('DOMAIN')) > -1) {
            userExist(email, function (error, doc) {
                if (error || doc === null) {
                    User.create({
                        role: constant.MESSAGE_MAP.get('PROFESSOR_ROLE'),
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        sjsuId: professorId,
                        isVerified: false,
                        password: hash
                    }, function (err, doc) {
                        if (err) {
                            res.status(400).send(constant.MESSAGE_MAP.get('PROFESSOR_REGISTER_FAILED'));
                        }
                        else {
                            res.status(200).send(constant.MESSAGE_MAP.get('PROFESSOR_REGISTER_SUCCESS'));
                            utility.welcomeProfessorMail(email, password);
                        }
                    });
                } else {
                    res.status(400).send(constant.MESSAGE_MAP.get('PROFESSOR_REGISTERED'));
                }
            });
        } else {
            res.status(400).send(constant.MESSAGE_MAP.get('REGISTER_INVALID_EMAIL'));
        }
    });

    /* ---------------------------------------------------------------------VERIFY USER EMAIL--------------------------------------------------------------------------------*/
    router.get('/verifyUser', function (req, res) {
        var emailAddress = req.query.email;
        var applicationUrl = config.applicationUrl;
        emailAddress = emailAddress.toLowerCase();
        User.update({email: emailAddress}, {$set: {isVerified: true}}, function (err, doc) {
            if (err || doc === null) {
                res.send('<center><br><br><h3>Some error occured in verification, please try again.</h3></center>');
            }
            else {
                res.send('<center><br><br><br><h3>Email address verified.</h3>' +
                    '<br><a href="' + applicationUrl + '">Login!</a>' +
                    '</center>');
            }
        });
    });

    /* -------------------------------------------------------------RETRIEVE PASSWORD IN CASE USER FORGETS----------------------------------------------------------------------------------------*/
    router.get('/retrievePassword', function (req, res) {
        var userEmail = req.query.email;
        userEmail = userEmail.toLowerCase();
        userExist(userEmail, function (error, doc) {
            if (error || doc === null) {
                res.status(401).send(constant.MESSAGE_MAP.get('USER_NOT_EXIST'));
            } else {
                var randomPassword = getRandomPassword();
                utility.resetPassword(userEmail, randomPassword);
                var data = {
                    randomPass: randomPassword,
                    message: constant.MESSAGE_MAP.get('PASSWORD_RESET_SENT')
                };
                res.json(data);
            }
        });
    });

    /* ---------------------------------------------------------UPDATE EXISTING USER PASSWORD--------------------------------------------------------------------------------------------*/
    router.post('/updatePassword', function (req, res) {
        var email = req.body.email;
        var password = req.body.password;

        email = email.toLowerCase();
        var hash = new Buffer(password).toString('base64');

        User.update({email: email}, {$set: {password: hash}}, function (err, doc) {
            if (err || doc === null) {
                res.status(401).send(constant.MESSAGE_MAP.get('PASSWORD_RESET_FAILED'));
            }
            else {
                res.status(200).send(constant.MESSAGE_MAP.get('PASSWORD_RESET_SUCCESS'));
            }
        });
    });

    /* -------------------------------------------------------------------CHECK IF A VALID USER----------------------------------------------------------------------------------*/
    router.get('/isValidUser/:email', function (req, res) {
        var email = req.params.email;

        email = email.toLowerCase();
        userExist(email, function (err, doc) {
            if (err || doc === null) {
                res.status(401).send(constant.MESSAGE_MAP.get('USER_SERVICE_UNAVAILABLE'));
            }
            else {
                res.status(200).send(constant.MESSAGE_MAP.get('IS_VALID_USER'));
            }
        });
    });

    /* -------------------------------------------------------------GET LOGGED IN USER' DETAILS----------------------------------------------------------------------------------------*/
    router.get('/getUserDetails/:email', function (req, res) {
        var email = req.params.email;
        email = email.toLowerCase();
        userExist(email, function (err, doc) {
            if (err || doc === null) {
                res.status(401).send(constant.MESSAGE_MAP.get('USER_SERVICE_UNAVAILABLE'));
            }
            else {
                res.json(doc);
            }
        });
    });

    /* ------------------------------------------------------------UPDATE USER PROFILE-----------------------------------------------------------------------------------------*/
    router.post('/updateProfile', function (req, res) {
        var email = req.body.email;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        email = email.toLowerCase();
        User.update({email: email}, {$set: {firstName: firstName, lastName: lastName}}, function (err, doc) {
            if (err || doc === null) {
                res.status(401).send(constant.MESSAGE_MAP.get('PROFILE_UPDATE_FAILED'));
            }
            else {
                res.status(200).send(constant.MESSAGE_MAP.get('PROFILE_UPDATE_SUCCESS'));
            }
        });
    });

    /* -----------------------------------------------------------------GET STUDENT CANVAS PROFILE------------------------------------------------------------------------------------*/
    router.get('/getUserCanvasProfile/:email', function (req, res) {
        var email = req.params.email;

        email = email.toLowerCase();
        var apiUrl = constant.MESSAGE_MAP.get('CANVAS_GET_USER_PROFILE');
        apiUrl = apiUrl.replace(':user_id', email);

        canvasConnectivity.getCanvasDetails(apiUrl, email, function (err, body) {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(body));
            } else {
                res.status(400).send(constant.MESSAGE_MAP.get('CANVAS_CONNECTION_FAILED'));
            }
        });
    });

    /* ----------------------------------------------------------CHECK IF USER EXIST IN DATABASE-------------------------------------------------------------------------------------------*/
    function userExist(email, cb) {
        email = email.toLowerCase();
        User.findOne({email: email}, function (err, doc) {
            cb(err, doc);
        });
    }

    /* --------------------------------------------------------------GENERATE RANDOM PASSWORD---------------------------------------------------------------------------------------*/
    function getRandomPassword() {
        return base64url(crypto.randomBytes(15));
    }
};
