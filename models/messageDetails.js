'use strict';

var mongoose = require('mongoose');

/* --------------------------------------------------COLLECTION FOR STORING COLLABORATION MAILS------------------------------------------------------------------------------------------------*/
var messageDetails = function () {
    var messageSchema = mongoose.Schema({
        toUser: String,
        fromUser: String,
        subject: String,
        content: String,
        messageTimestamp: {type: Date, default: Date.now}
    }, {
        collection: 'messageDetails'
    });

    return mongoose.model('messageDetails', messageSchema);
};

module.exports = new messageDetails();


