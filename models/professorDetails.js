'use strict';

var mongoose = require('mongoose');

/* ---------------------------------------------------COLLECTION FOR STORING COURSES ASSIGNED TO PROFESSORS-----------------------------------------------------------------------------------------------*/
var professorDetails = function () {
    var professorSchema = mongoose.Schema({
        email: String,
        term: String,
        year: Number,
        courseId: String,
        status: Boolean
    }, {
        collection: 'professorDetails'
    });

    return mongoose.model('professorDetails', professorSchema);
};

module.exports = new professorDetails();


