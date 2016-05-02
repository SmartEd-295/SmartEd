'use strict';

var mongoose = require('mongoose');

var recommendedCourses = function() {
    var courseRecommendationSchema = mongoose.Schema({
        _id: String,
        studentId: String,
        recommendations: [{
            courseId: String,
            expectedGrade: String,
            courseName: String
        }]
    }, {
        collection: 'recommendedCourses'
    });

    return mongoose.model('recommendedCourses', courseRecommendationSchema);
};

module.exports = new recommendedCourses();
