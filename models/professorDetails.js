'use strict';

var mongoose = require('mongoose');

module.exports = function UserModel() {
    var professorSchema = mongoose.Schema({
        email: String,
        semesterTerm: String,
        semesterYear: Number,
        subjectId: String,
        subjectName: String,
        status: Boolean
    }, {
        collection: 'professorDetails'
    });

    return mongoose.model('professorDetails', professorSchema);
};
