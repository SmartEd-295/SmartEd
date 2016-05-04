'use strict';

var CourseDetails = require('../../models/courseDetails'),
    CourseMetaData = require('../../models/courseMetaData'),
    constant = require('../../lib/constants'),
    utility = require('../../lib/utility'),
    config = require('../../config/config.json');

module.exports = function (router) {

    router.get('/getCourseDetails', function (req, res) {
        var cid = req.query.courseId;
        CourseDetails.findOne({code: cid}, function (err, doc) {
            if (!err && doc !== null) {
                getGradeDetails(doc, req, res);
            } else {
                res.sendStatus(400);
            }
        });
    });

    router.get('/getAllCourseDetails', function (req, res) {
        CourseDetails.find({}).sort({code: -1}).exec(function (err, docs) {
            if (!err) {

                var courseList = [];

                for (var i = docs.length - 1; i >= 0; i--) {
                    var result = docs[i];
                    var course = {
                        'courseId': result.code,
                        'courseName': result.name,
                        'displayName': result.code + ' ' + result.name
                    };
                    courseList.push(course);
                }

                res.json(courseList);
            } else {
                res.status(400).send(constant.MESSAGE_MAP.get(''));
            }
        });
    });

    function getGradeDetails(course, req, res) {
        var courseId = course.peoplesoftId;
        var term = req.query.term;
        var year = req.query.year;

        var isRegularTerm = true;

        utility.getCurrentTerm(term, year, isRegularTerm, function (termId) {
            console.log('Name:' + courseId + ' ,Term : ' + termId);

            CourseMetaData.aggregate([
                {
                    $match: {
                        term: Number(termId),
                        courseId: Number(courseId),
                        subject: "CMPE"
                    }
                },
                {
                    $group: {
                        _id: "$gpa",
                        total: {$sum: 1}
                    }
                }
            ], function (err, result) {
                if (err || result === null) {
                    res.sendStatus(400);
                }else{
                    var responseData = {
                        "courseData": course,
                        "chartData": result
                    };
                    res.json(responseData);
                }

            });

        });
    }
};


