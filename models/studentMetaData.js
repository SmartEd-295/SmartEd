'use strict';

var mongoose = require('mongoose');

var studentMetaData = function() {
    var studentSchema = mongoose.Schema({
        empId : String,
        name : String,
        term : Number,
        academicCareer : String,
        program : String,
        overallGpa : String,
        sjsuGpa : String,
        gender : String,
        nationality : String,
        birth : String,
        lastTermEnrolled : Number,
        academicStanding : String,
        academicStandingDescription : String,
        expectedGradTerm : Number,
        gradStatus : String,
        gradstatusDesc : String,
        academicLevel : String,
        transferStatus : String,
        financialAid : String
    }, {
        collection: 'studentMetaData'
    });

    return mongoose.model('studentMetaData', studentSchema);
};

module.exports = new studentMetaData();
