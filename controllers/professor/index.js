'use strict';

var User = require('../../models/user'),
    ProfessorDetails = require('../../models/professorDetails'),
    constant = require('../../lib/constants'),
    utility = require('../../lib/utility');

module.exports = function (router) {

    /* -----------------------------------------------------------GET ASSIGNED ACTIVE COURSES FOR PROFESSOR---------------------------------------------------------------------------------------*/
    router.get('/getProfessorCourses/:professorId', function (req, res) {
        var profId = req.params.professorId;
        ProfessorDetails.find({email: profId, status: true}, function (err, docs) {
            if(!err){
                res.json(docs);
            }else{
                res.status(400).send(constant.MESSAGE_MAP.get('GET_SINGLE_PROF_COURSES_FAILED'));
            }
        });
    });

    /* --------------------------------------------------------GET ALL PROFESSORS' ASSIGNED COURSES------------------------------------------------------------------------------------------*/
    router.get('/getProfessorCourseDetails', function (req, res) {
        ProfessorDetails.find({}, function (err, docs) {
            if (!err) {
                res.json(docs);
            } else {
                res.status(400).send(constant.MESSAGE_MAP.get('GET_ALL_PROFESSOR_FAILED'));
            }
        });
    });

    /* ------------------------------------------------GET PROFESSOR EMAILS FROM THE USER COLLECTION--------------------------------------------------------------------------------------------------*/
    router.get('/getAllProfessors', function (req, res) {
        User.find({role: constant.MESSAGE_MAP.get('PROFESSOR_ROLE'), isVerified: true})
            .select('email')
            .sort('email').exec(function (err, docs) {
            if (!err) {
                res.json(docs);
            } else {
                res.status(400);
            }
        });
    });

    /* ------------------------------------------------------ASSIGN A COURSE TO SELECTED PROFESSOR--------------------------------------------------------------------------------------------*/
    router.post('/assignCourse', function (req, res) {
        var email = req.body.email;
        var term = req.body.term;
        var course = req.body.course;
        var year = req.body.year;

        email = email.toLocaleLowerCase();
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

    /* -------------------------------------------------------CHANGE STATUS OF THE ASSIGNED COURSE-------------------------------------------------------------------------------------------*/
    router.post('/changeStatus', function (req, res) {
        var email = req.body.email;
        var courseId = req.body.courseId;
        var status = req.body.status;
        var semester = req.body.term+' '+req.body.year;

        var updatedStatus = !(status);

        email = email.toLocaleLowerCase();
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
