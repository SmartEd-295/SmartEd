'use strict';

var myApp = angular.module('smartedApp');

myApp.service('StudentService', ['$http', 'UserService', function ($http, UserService) {

  this.getCourseRecommendations = function () {
    var userId =  UserService.getCurrentUser().sjsuId;
    return $http.get('/student/getRecommendedCourses/' + userId );
  };

  this.getUdacityCourses = function(courseName) {
    return $http.get('/resources//getUdacityRecommendations/' + courseName );
  }
}]);
