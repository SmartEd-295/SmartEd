'use strict';

var externalResourceAPI = require('../../lib/externalResourceAPI');

module.exports = function (router) {

    /* ----------------------------------------------------------------GET UDACITY COURSE DETAILS FOR THE GIVEN COURSE----------------------------------------------------------------------------------*/
    router.get('/getUdacityRecommendations/:courseName', function (req, res) {

        // get course name from original request
        var cName = req.params.courseName;
        cName = cName.toLowerCase();
        var filteredCourses = [];

        var callback = function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {

                var json_response = JSON.parse(str);
                var courses = json_response.courses;

                var updatedCourses = [];
                for (var i = 0; i < courses.length; i++) {
                    var current = courses[i];
                    var newCourse = {
                        'key': current.key,
                        'title': current.title,
                        'homepage': current.homepage,
                        'level': current.level,
                        'expected_duration': current.expected_duration,
                        'expected_duration_unit': current.expected_duration_unit,
                        'short_summary': current.short_summary
                    };
                    updatedCourses.push(newCourse);
                }
                res.json(updatedCourses);
            });
        };
        externalResourceAPI.getUdacityRecommendations(cName, callback);
    });
};


