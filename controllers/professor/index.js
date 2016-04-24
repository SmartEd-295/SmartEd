'use strict';

var User = require('../../models/user'),
    ProfessorDetails = require('../../models/professorDetails'),
    constant = require('../../lib/constants'),
    config = require('../../config/config.json');

module.exports = function (router) {

    router.get('/getProfessorCourseDetails/:professorId', function (req, res) {
        var profId = req.params.professorId;
        console.log("in getprofessorcoursedetails function -----------> " + profId);
        ProfessorDetails.find({email: profId}, function (err, docs) {
            console.log(docs.length + " : " + err );
            if(!err){

                res.json(docs);

            }else{
                res.status(400).send(constant.MESSAGE_MAP.get('GET_SINGLE_PROF_COURSES_FAILED'));
            }
        });
    });

    router.get('/getProfessorCourseDetails/', function (req, res) {
        ProfessorDetails.find({}, function (err, docs) {
            if(!err){
                res.json(docs);
            }else{
                res.status(400).send(constant.MESSAGE_MAP.get('GET_ALL_PROFESSOR_FAILED'));
            }
        });
    });

    router.get('/getAllProfessors', function(req, res){
       User.find({role: constant.MESSAGE_MAP.get('PROFESSOR_ROLE')},{email: 1, _id: 0}, function(err, docs){
           if(!err){
               res.json(docs);
           }else{
               res.status(400);
           }
       });
    });


};
