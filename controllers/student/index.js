'use strict';

var User = require('../../models/user'),
    constant = require('../../lib/constants'),
    RecommendedCourses = require('../../models/recommendedCourses'),
    utility = require('../../lib/utility');

module.exports = function (router) {

    router.get('/getRecommendedCourses/:studentId', function (req, res) {
        var studentId = req.params.studentId;
        RecommendedCourses.find({studentId: studentId}, function (err, docs) {
            if(!err){
                res.json(docs);
            }else{
                res.status(400).send(constant.MESSAGE_MAP.get('GET_RECOMMENDED_COURSES_FAILED'));
            }
        });
    });
};
