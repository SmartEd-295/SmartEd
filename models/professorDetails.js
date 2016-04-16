'use strict';

var mongoose = require('mongoose');

module.exports = function UserModel() {
    var professorSchema = mongoose.Schema({
        email : String,
        classData: [{
            id: String,
            name: String
        }]
    },{
        collection: 'professorDetails'
    });

    return mongoose.model('professorDetails', professorSchema);
};
