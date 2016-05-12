'use strict';

var mongoose = require('mongoose');

/* ---------------------------------------------------------COLLECTION FOR ALL CMPE SUPPORTED COURSES-----------------------------------------------------------------------------------------*/
var courseDetails = function () {
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
