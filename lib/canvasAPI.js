'use strict';

var request = require('request');
var CanvasModel = require('../models/canvasConnection');

/* ----------------------------------------------------API TO FETCH CANVAS  DATA USING USER TOKENS----------------------------------------------------------------------------------------------*/

var Canvas = new CanvasModel();

/* ---------------------------------------------------------PRIVATE FUNCTIONS----------------------------------------------------------------------------------------*/

/* -------------------------------------------------------HIT CANVAS ENDPOINT TO FETCH THE PARTICULAR STUDENT DATA-------------------------------------------------------------------------------------------*/
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
    /* --------------------------------------------------------EXPOSED PUBLIC FUNCTIONS------------------------------------------------------------------------------------------*/
    return {

        /* -----------------------------------------------------GET STUDENT ACCESS TOKEN AND HIT FUNCTION TO CONNECT TO CANVAS---------------------------------------------------------------------------------------------*/
        getCanvasDetails: function (apiEndPoint, userMail, cb) {

            Canvas.findOne({email: userMail}, function (err, doc) {
                if (!err && doc !== null) {
                    var token = doc.token;
                    var header = 'Bearer ' + token;
                    var URL = 'https://canvas.instructure.com' + apiEndPoint;
                    getDataFromCanvas(URL, header, cb);
                }
            });
        }
    };
};

module.exports = canvasConnectivity();



