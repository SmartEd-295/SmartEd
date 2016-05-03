'use strict';

var http = require('https');

//--------------------------------------- PRIVATE FUNCTIONS------------------------------------------------

var getUdacityCatalog = function (recommendedCourseName, callback) {
    var options = {
        host: 'www.udacity.com',
        path: '/public-api/v0/courses'
    };
    http.request(options, callback).end();
};

var externalResourceAPI = function () {
    //--------------------------------------- EXPOSED FUNCTIONS------------------------------------------------
    return {
        getUdacityRecommendations: function (recommendedCourseName, callback) {
            getUdacityCatalog(recommendedCourseName, callback);
        }
    };
};

module.exports = externalResourceAPI();



