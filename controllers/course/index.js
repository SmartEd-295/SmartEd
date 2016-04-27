'use strict';

var CourseDetails = require('../../models/courseDetails'),
    CourseMetaData = require('../../models/courseMetaData'),
    constant = require('../../lib/constants'),
    utility = require('../../lib/utility'),
    config = require('../../config/config.json');

module.exports = function (router) {

    router.get('/getCourseDetails', function (req, res) {
        var cid = req.query.courseId;

        getCourseById(cid, function(course){
           //getGradeDetails(course, req, res);
        });

        CourseDetails.findOne({_id: cid}, function (err, doc) {
            if(!err && doc !== null){
                res.json(doc);
            }else{
                res.sendStatus(400);
            }
        });
    });

    router.get('/getAllCourseDetails', function (req, res) {
        CourseDetails.find({}, function (err, docs) {
            if(!err){

                var courseList = [];

                for (var i = docs.length - 1; i >= 0; i--) {
                    var result = docs[i];
                    var course ={
                        'courseId': result._id,
                        'courseName': result.name,
                        'description': result.description,
                        'content': result.content,
                        'displayName': result._id+' '+result.name
                    };
                    courseList.push(course);
                }

                res.json(courseList);
            }else{
                res.status(400).send(constant.MESSAGE_MAP.get(''));
            }
        });
    });

    function getGradeDetails(course, req, res){
        var name = course.name;
        var term = req.query.term;
        var year = req.query.year;

        utility.getCurrentTerm(term, year, function(termId){
            console.log('Name:'+name+' ,Term : '+termId);

            CourseMetaData.find({'Course Name': name, Term: termId}, function(err, docs){
                if(!err){
                    console.log('My Docs>>>>>>'+docs.length);
                }else{
                    console.log('My Error:>>>>>'+err);
                }
            });

        });
    }

    function getCourseById(courseId, cb){
        CourseDetails.findById(courseId, function(err, doc){
            if(!err && doc !== null){
                cb(doc);
            }
        });
    }
};


