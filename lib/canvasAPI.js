'use strict';

var request = require('request');
var CanvasModel = require('../models/canvasConnection');

var Canvas = new CanvasModel();

//--------------------------------------- PRIVATE FUNCTIONS------------------------------------------------

var getDataFromCanvas = function (URL, header, cb) {
    var options = {
        method: 'GET',
        url: URL,
        headers: {authorization: header}
    };

    request(options, function (error, response, body) {
            cb(error, body);
    });
};

var canvasConnectivity = function () {
    //--------------------------------------- EXPOSED FUNCTIONS------------------------------------------------
    return {

        getCanvasDetails: function (apiEndPoint, userMail, cb) {

            Canvas.findOne({email: userMail}, function (err, doc) {
                if (!err && doc !== null) {
                    var token = doc.token;
                    var header = 'Bearer ' + token;
                    var URL = 'https://canvas.instructure.com' + apiEndPoint;
                    console.log("In canvasAPI Hit :-----> " + URL);
                    getDataFromCanvas(URL, header, cb);
                }
            });
        }
    };
};

module.exports = canvasConnectivity();



