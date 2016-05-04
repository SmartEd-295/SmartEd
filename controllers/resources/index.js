'use strict';

var constant = require('../../lib/constants'),
    utility = require('../../lib/utility'),
    config = require('../../config/config.json'),
    externalResourceAPI = require('../../lib/externalResourceAPI');

module.exports = function (router) {

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

                console.log(cName + "-----------> " + courses.length);

                var updatedCourses = [];
                for (var i = 0; i < courses.length; i++) {
                    var current = courses[i];
                    var newCourse = {
                        "key": current.key,
                        "title": current.title,
                        "homepage": current.homepage,
                        "level": current.level,
                        "expected_duration": current.expected_duration,
                        "expected_duration_unit": current.expected_duration_unit,
                        "short_summary": current.short_summary
                    };
                    updatedCourses.push(newCourse);
                }
                console.log("Updated Data >>>>>>>>>"+updatedCourses.length);
                console.log("New Data>>>>>>>"+JSON.stringify(updatedCourses));

                // change filtering logic
                for (var i = 0; i < courses.length; i++) {
                    var current = courses[i];
                    var title = current.title;
                     title = title.toLowerCase();
                    var summary = current.short_summary;
                        summary = summary.toLowerCase();
                    if(title.indexOf(cName) > -1 || summary.indexOf(cName) > -1) {
                        var newCourse = {
                            "key": current.key,
                            "title": current.title,
                            "homepage": current.homepage,
                            "level": current.level,
                            "expected_duration": current.expected_duration,
                            "expected_duration_unit": current.expected_duration_unit,
                            "short_summary": current.short_summary
                        };

                        filteredCourses.push(newCourse);
                    }
                }
                console.log("Filter data length     >>>>>>>>>>>>>>>>>>>>>>-----------> "+ filteredCourses.length);

                res.json(updatedCourses);
            });
        };
        // create a new request to fetch all courses if not already present
        externalResourceAPI.getUdacityRecommendations(cName, callback);
    });
};


