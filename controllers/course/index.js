'use strict';

var CourseDetails = require('../../models/courseDetails'),
    constant = require('../../lib/constants'),
    utility = require('../../lib/utility'),
    config = require('../../config/config.json');

module.exports = function (router) {

    router.get('/getCourseDetails', function (req, res) {
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
                        'displayName': result._id+' '+result.courseName
                    };
                    courseList.push(course);
                }

                res.json(courseList);
            }else{
                res.status(400).send(constant.MESSAGE_MAP.get(''));
            }
        });
    });
};
