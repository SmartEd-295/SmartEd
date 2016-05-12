'use strict';

var constant = require('../../lib/constants'),
    RecommendedCourses = require('../../models/recommendedCourses'),
    canvasConnectivity = require('../../lib/canvasAPI');

module.exports = function (router) {

    router.get('/getRecommendedCourses/:studentId', function (req, res) {
        var studentId = req.params.studentId;
        RecommendedCourses.findOne({studentId: studentId}, function (err, doc) {
            if (!err) {
                res.json(doc);
            } else {
                res.status(400).send(constant.MESSAGE_MAP.get('GET_RECOMMENDED_COURSES_FAILED'));
            }
        });
    });

    router.get('/getEnrolledCourses/:userEmail', function (req, res) {
        var userEmail = req.params.userEmail;
        canvasConnectivity.getCanvasDetails(constant.MESSAGE_MAP.get('CANVAS_GET_COURSE_LIST'), userEmail, function (err, body) {
            if (!err) {
                //console.log("In student index API success :-----> " + body);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(body));
            } else {
                console.log('In student ctrl failure :-----> ' + userEmail);
                res.status(400).send(constant.MESSAGE_MAP.get('CANVAS_CONNECTION_FAILED'));
            }
        });
    });


    router.get('/getAssignments/:courseId/:userEmail', function (req, res) {
        var userEmail = req.params.userEmail;

        var courseId = req.params.courseId;
        var apiUrl = constant.MESSAGE_MAP.get('CANVAS_GET_ASSIGNMENT_LIST');
        apiUrl = apiUrl.replace(':course_id', courseId);

        canvasConnectivity.getCanvasDetails(apiUrl, userEmail, function (err, body) {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(body));
            } else {
                res.status(400).send(constant.MESSAGE_MAP.get('CANVAS_CONNECTION_FAILED'));
            }
        });
    });

    router.get('/getQuizzes/:courseId/:userEmail', function (req, res) {
        var userEmail = req.params.userEmail;

        var courseId = req.params.courseId;
        var apiUrl = constant.MESSAGE_MAP.get('CANVAS_GET_QUIZ_LIST');
        apiUrl = apiUrl.replace(':course_id', courseId);

        canvasConnectivity.getCanvasDetails(apiUrl, userEmail, function (err, body) {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(body));
            } else {
                res.status(400).send(constant.MESSAGE_MAP.get('CANVAS_CONNECTION_FAILED'));
            }
        });
    });


    router.get('/getActivityStream/:userMail', function (req, res) {
        var userMail = req.params.userMail;

        var apiUrl = constant.MESSAGE_MAP.get('CANVAS_GET_USER_ACTIVITY_STREAM');
        apiUrl = apiUrl.replace(':user_id', userMail);

        canvasConnectivity.getCanvasDetails(apiUrl, userMail, function (err, body) {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(body));
            } else {
                res.status(400).send(constant.MESSAGE_MAP.get('CANVAS_CONNECTION_FAILED'));
            }
        });
    });


    router.get('/getToDoList/:userMail', function (req, res) {
        var userMail = req.params.userMail;

        var apiUrl = constant.MESSAGE_MAP.get('CANVAS_GET_USER_TODO_LIST');

        canvasConnectivity.getCanvasDetails(apiUrl, userMail, function (err, body) {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(body));
            } else {
                res.status(400).send(constant.MESSAGE_MAP.get('CANVAS_CONNECTION_FAILED'));
            }
        });
    });


    // end point doesnt exist
    router.get('/getMissingSubmissions/:userMail', function (req, res) {
        var userMail = req.params.userMail;

        var apiUrl = constant.MESSAGE_MAP.get('CANVAS_GET_MISSING_SUBMISSIONS');
        apiUrl = apiUrl.replace(':user_id', userMail);

        canvasConnectivity.getCanvasDetails(apiUrl, userMail, function (err, body) {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(body));
            } else {
                res.status(400).send(constant.MESSAGE_MAP.get('CANVAS_CONNECTION_FAILED'));
            }
        });
    });


};
