'use strict';

var mongoose = require('mongoose');

var courseDetails = function() {
    var courseSchema = mongoose.Schema({
        _id: String,
        name: String,
        description: String,
        content: String
    }, {
        collection: 'courseDetails'
    });

    return mongoose.model('courseDetails', courseSchema);
};

module.exports = new courseDetails();
