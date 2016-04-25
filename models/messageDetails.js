'use strict';

var mongoose = require('mongoose');

var messageDetails = function() {
    var courseSchema = mongoose.Schema({
        _id: String,
        name: String,
        description: String,
        content: String
    }, {
        collection: 'messageDetails'
    });

    return mongoose.model('messageDetails', courseSchema);
};

module.exports = new messageDetails();
