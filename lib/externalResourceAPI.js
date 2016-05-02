'use strict';

var http = require('https');

//--------------------------------------- PRIVATE FUNCTIONS------------------------------------------------

var getUdacityCatalog = function (recommendedCourseName, callback) {
    var storedCatalog = [];
    var options = {
        host: 'api.coursera.org',
        path: '/api/courses.v1?q=search&query='+recommendedCourseName
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



