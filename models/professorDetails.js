'use strict';

var mongoose = require('mongoose');

var professorDetails = function() {
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
