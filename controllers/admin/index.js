'use strict';

var UserModel = require('../../models/user'),
    ProfessorModel = require('../../models/professorDetails'),
    constant = require('../../lib/constants'),
    utility = require('../../lib/utility'),
    sessionFilter = require('../../lib/sessionFilter'),
    config = require('../../config/config.json');

module.exports = function (router) {

    var ProfessorDetails = ProfessorModel;


    router.get('/getProfessorDetails', function (req, res) {
        ProfessorDetails.find({}, function (err, docs) {
            if(!err){
                //var details = [];
                //
                //for (var i = docs.length - 1; i >= 0; i--) {
                //    var result = docs[i];
                //    var payment ={
                //        "payment_id": result._id,
                //        "settlement_currency": result.settlement_currency,
                //        "payment_method": result.payment_method,
                //        "payment_date": moment(result.creation_date).format('MM/DD/YYYY'),
                //        "payment_time": moment(result.creation_date).format('MM/DD/YYYY HH:MM'),
                //        "amount": result.amount+" "+result.currency,
                //        "status": result.status,
                //        "payment_type": result.payment_type,
                //        "account_id": result.account_id
                //    };
                //    paymentList.push(payment);
                //};

                res.json(docs);
            }else{
                res.status(400).send(constant.MESSAGE_MAP.get("GET_ALL_PAYMENT_FAILED"));
            }
        });
    });
};
