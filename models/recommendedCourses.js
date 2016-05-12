'use strict';

var mongoose = require('mongoose');

/* -------------------------------------------------------------COLLECTION TO STORE STUDENTS' RECOMMENDED COURSES-------------------------------------------------------------------------------------*/
var recommendedCourses = function () {
    var courseRecommendationSchema = mongoose.Schema({
        studentId: String,
        recommendations: [{
            courseId: String,
            expectedGrade: String,
            courseName: String,
            courseCode: String
        }]
    }, {
        collection: 'recommendedCourses'
    });

    return mongoose.model('recommendedCourses', courseRecommendationSchema);
};

module.exports = new recommendedCourses();
