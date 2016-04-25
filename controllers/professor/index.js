'use strict';

var User = require('../../models/user'),
    ProfessorDetails = require('../../models/professorDetails'),
    constant = require('../../lib/constants'),
    utility = require('../../lib/utility');

module.exports = function (router) {

    router.get('/getProfessorCourses/:professorId', function (req, res) {
        var profId = req.params.professorId;
        ProfessorDetails.find({email: profId}, function (err, docs) {
            console.log(docs.length + ' : ' + err );
            if(!err){
                res.json(docs);
            }else{
                res.status(400).send(constant.MESSAGE_MAP.get('GET_SINGLE_PROF_COURSES_FAILED'));
            }
        });
    });

    router.get('/getProfessorCourseDetails', function (req, res) {
        ProfessorDetails.find({}, function (err, docs) {
            if (!err) {
                res.json(docs);
            } else {
                res.status(400).send(constant.MESSAGE_MAP.get('GET_ALL_PROFESSOR_FAILED'));
            }
        });
    });

    router.get('/getAllProfessors', function (req, res) {
        User.find({role: constant.MESSAGE_MAP.get('PROFESSOR_ROLE'), isVerified: true}, {email: 1, _id: 0}, function (err, docs) {
            if (!err) {
                res.json(docs);
            } else {
                res.status(400);
            }
        });
    });

    router.post('/assignCourse', function (req, res) {
        var email = req.body.email;
        var term = req.body.term;
        var course = req.body.course;
        var year = req.body.year;

        ProfessorDetails.find({email: email, courseId: course, term: term, year: year}, function (err, docs) {
            if (!err && docs.length > 0) {
                res.status(400).send(constant.MESSAGE_MAP.get('COURSE_PRESENT'));
            } else {
                ProfessorDetails.create({
                    email: email,
                    term: term,
                    year: year,
                    courseId: course,
                    status: true
                }, function (err, doc) {
                    if (err) {
                        res.status(400).send(constant.MESSAGE_MAP.get('COURSE_ASSIGN_ERROR'));
                    }
                    else {
                        res.sendStatus(200);
                    }
                });
            }
        });
    });

    router.post('/changeStatus', function (req, res) {
        var email = req.body.email;
        var courseId = req.body.courseId;
        var status = req.body.status;
        var semester = req.body.term+' '+req.body.year;

        var updatedStatus = !(status);

        ProfessorDetails.update({email: email, courseId: courseId}, {$set: {status: updatedStatus}}, function (err, doc) {

            if (err || doc === null) {
                res.status(400).send(constant.MESSAGE_MAP.get('STATUS_CHANGE_ERROR'));
            }else {
                res.sendStatus(200);
                utility.courseStatusChange(email, semester, updatedStatus, courseId);
            }
        });
    });
};
