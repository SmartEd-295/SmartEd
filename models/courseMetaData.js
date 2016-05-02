'use strict';

var mongoose = require('mongoose');

var courseMetaData = function() {
    var courseSchema = mongoose.Schema({
        studentId: Number,
        term: Number,
        courseId: Number,
        courseName: String,
        subject: String,
        section: Number,
        gpa: String,
        instructorId: Number
    }, {
        collection: 'courseMetaData'
    });

    return mongoose.model('courseMetaData', courseSchema);
};

module.exports = new courseMetaData();





