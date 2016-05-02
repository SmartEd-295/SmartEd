'use strict';

var constant = require('../../lib/constants'),
    utility = require('../../lib/utility'),
    config = require('../../config/config.json'),
    externalResourceAPI = require('../../lib/externalResourceAPI');

module.exports = function (router) {

    router.get('/getUdacityRecommendations/:courseName', function (req, res) {

        // get course name from original request
        var cName = req.params.courseName;

        var callback = function(response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                var json_response = JSON.parse(str);
                var courses = json_response.courses;
                res.json(courses);
            });
        };
        // create a new request to fetch all courses if not already present
        externalResourceAPI.getUdacityRecommendations(cName, callback);
    });
};


