'use strict';

var User = require('../../models/user'),
    ProfessorDetails = require('../../models/professorDetails'),
    constant = require('../../lib/constants'),
    utility = require('../../lib/utility'),
    sessionFilter = require('../../lib/sessionFilter'),
    config = require('../../config/config.json');

module.exports = function (router) {

    router.get('/getProfessorDetails', function (req, res) {
        ProfessorDetails.find({}, function (err, docs) {
            if(!err){
                res.json(docs);
            }else{
                res.status(400).send(constant.MESSAGE_MAP.get("GET_ALL_PROFESSOR_FAILED"));
            }
        });
    });
};
