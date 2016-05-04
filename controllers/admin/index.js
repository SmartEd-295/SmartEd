'use strict';

var StudentDetails = require('../../models/studentVisualization'),
    constant = require('../../lib/constants'),
    utility = require('../../lib/utility'),
    sessionFilter = require('../../lib/sessionFilter'),
    config = require('../../config/config.json');

module.exports = function (router) {

    router.get('/getStudentDetails', function (req, res) {
        StudentDetails.find({term: 2160}).sort('type').exec(function (err, docs) {
            if(!err){
                res.json(docs);
            }else{
                res.status(400).send(constant.MESSAGE_MAP.get('GET_STUDENT_VISUALIZATION_FAILED'));
            }
        });
    });

    router.get('/getDetailsPerCategory', function(req, res){
        var category = req.query.category;
        var term = req.query.term;
        var year = req.query.year;

        var isRegularTerm = true;
        utility.getCurrentTerm(term, year, isRegularTerm, function(termId){
            StudentDetails.findOne({type: category, term: termId}).exec(function(err, doc){
                if(!err && doc !== null){
                    console.log(JSON.stringify(doc));
                    res.json(doc);
                }else{
                    res.status(400).send(constant.MESSAGE_MAP.get('GET_STUDENT_VISUALIZATION_PER_TERM_FAILED'));
                }
            });
        });
    });
};
