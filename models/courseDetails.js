'use strict';

var mongoose = require('mongoose');

var courseDetails = function() {
    var courseSchema = mongoose.Schema({
        code: String,
        canvasId: Number,
        peoplesoftId: Number,
        name: String
    }, {
        collection: 'courseInfo'
    });

    return mongoose.model('courseDetails', courseSchema);
};

module.exports = new courseDetails();
