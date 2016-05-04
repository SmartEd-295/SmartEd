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

        var callback = function(response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                console.log("My Response>>>>>>>"+str);
                var json_response = JSON.parse(str);
                var courses = json_response.courses;

                console.log(cName + "-----------> "+ courses.length);
                // change filtering logic
                for (var i = 0; i < courses.length; i++) {
                    var title = courses[i].title,
                        summary = courses[i].summary,
                        tracks = courses[i].tracks;
                    if(title.indexOf(cName) > -1 || summary.indexOf(cName) > -1 || tracks.indexOf(cName) > -1) {
                        filteredCourses.push(courses[i]);
                    }
                }
                console.log("-----------> "+ filteredCourses.length);

                res.json(courses);
            });
        };
        // create a new request to fetch all courses if not already present
        externalResourceAPI.getUdacityRecommendations(cName, callback);
    });
};


