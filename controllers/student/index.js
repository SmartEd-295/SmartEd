'use strict';

var constant = require('../../lib/constants'),
    RecommendedCourses = require('../../models/recommendedCourses');

module.exports = function (router) {

    router.get('/getRecommendedCourses/:studentId', function (req, res) {
        var studentId = req.params.studentId;
        RecommendedCourses.findOne({studentId: studentId}, function (err, doc) {
            if(!err){
                res.json(doc);
            }else{
                res.status(400).send(constant.MESSAGE_MAP.get('GET_RECOMMENDED_COURSES_FAILED'));
            }
        });
    });
};
