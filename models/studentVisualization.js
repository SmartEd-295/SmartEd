'use strict';

var mongoose = require('mongoose');

var studentDetails = function() {
    var studentDetailsSchema = mongoose.Schema({
        type: String,
        term: Number,
        data: Array
    }, {
        collection: 'studentVisualizationData'
    });

    return mongoose.model('studentVisualizationData', studentDetailsSchema);
};

module.exports = new studentDetails();
