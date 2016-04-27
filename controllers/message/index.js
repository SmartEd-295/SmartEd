'use strict';

var MessageDetails = require('../../models/messageDetails'),
    constant = require('../../lib/constants'),
    utility = require('../../lib/utility'),
    config = require('../../config/config.json');

module.exports = function (router) {

    router.get('/getAllMessages/:userId', function (req, res) {
        var userId = req.params.userId;
        MessageDetails.find({toUser: userId}, function (err, docs) {
            if(!err){

                var messageList = [];

                for (var i = docs.length - 1; i >= 0; i--) {
                    var result = docs[i];
                    var message ={
                        'messageId': result._id,
                        'toUser': result.toUser,
                        'fromUser': result.fromUser,
                        'subject': result.subject,
                        'content': result.content,
                        'messageTimestamp': result.messageTimestamp
                    };
                    messageList.push(message);
                }

                if(messageList.length === 0) {
                    res.status(400).send(constant.MESSAGE_MAP.get('NO_MESSAGES_FOUND'));
                } else {
                    res.json(messageList);
                }
            }else{
                res.status(400).send(constant.MESSAGE_MAP.get('NO_MESSAGES_FOUND'));
            }
        });
    });



    router.get('/getAllSentMessages/:userId', function (req, res) {
        var userId = req.params.userId;
        MessageDetails.find({fromUser: userId}, function (err, docs) {
            if(!err){

                var messageList = [];

                for (var i = docs.length - 1; i >= 0; i--) {
                    var result = docs[i];
                    var message ={
                        'messageId': result._id,
                        'toUser': result.toUser,
                        'fromUser': result.fromUser,
                        'subject': result.subject,
                        'content': result.content,
                        'messageTimestamp': result.messageTimestamp
                    };
                    messageList.push(message);
                }

                if(messageList.length === 0) {
                    res.status(400).send(constant.MESSAGE_MAP.get('NO_SENT_MESSAGES_FOUND'));
                } else {
                    res.json(messageList);
                }
            }else{
                res.status(400).send(constant.MESSAGE_MAP.get('NO_MESSAGES_FOUND'));
            }
        });
    });

    router.get('/getMessageDetails/:messageId', function (req, res) {
        var msgId = req.params.messageId;
        MessageDetails.find({_id: msgId}, function (err, docs) {
            if(!err){
                var messageList = [];

                for (var i = docs.length - 1; i >= 0; i--) {
                    var result = docs[i];
                    var message ={
                        'messageId': result._id,
                        'toUser': result.toUser,
                        'fromUser': result.fromUser,
                        'subject': result.subject,
                        'content': result.content,
                        'messageTimestamp': result.messageTimestamp
                    };
                    messageList.push(message);
                }
                if(messageList.length === 0) {
                    res.status(400).send(constant.MESSAGE_MAP.get('ERROR_NO_MESSAGE_FOUND'));
                } else {
                    res.json(messageList);
                }
            }else{
                res.status(400).send(constant.MESSAGE_MAP.get('ERROR_NO_MESSAGE_FOUND'));
            }
        });
    });


    router.post('/addMessage', function (req, res) {
        var toUser = req.body.toUser;
        var fromUser = req.body.fromUser;
        var subject = req.body.subject;
        var content = req.body.content;

        MessageDetails.create({
            toUser: toUser,
            fromUser: fromUser,
            subject: subject,
            content: content
        },function (err, doc) {
            if (err) {
                res.status(400).send(constant.MESSAGE_MAP.get('MESSAGE_NOT_SENT'));
            }
            else {
                res.status(200).send(constant.MESSAGE_MAP.get('MESSAGE_SENT_SUCCESS'));
                utility.sendMessageMail(toUser, subject, content);
            }
        });
    });
};
