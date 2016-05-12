'use strict';

var http = require('https');

/* -------------------------------------------------------------------PRIVATE-------------------------------------------------------------------------------*/

/* ----------------------------------------------------------------CONNECT TO UDACITY API TO GET COURSE DETAILS----------------------------------------------------------------------------------*/
var getUdacityCatalog = function (recommendedCourseName, callback) {
    var options = {
        host: 'www.udacity.com',
        path: '/public-api/v0/courses'
    };
    http.request(options, callback).end();
};

var externalResourceAPI = function () {
    /* -------------------------------------------------------------------EXPOSED-------------------------------------------------------------------------------*/
    return {

        getUdacityRecommendations: function (recommendedCourseName, callback) {
            getUdacityCatalog(recommendedCourseName, callback);
        }
    };
};

module.exports = externalResourceAPI();



