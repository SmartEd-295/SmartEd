'use strict';

var myApp = angular.module('smartedApp');

myApp.service('StudentService', ['$http', 'UserService', function ($http, UserService) {


  var currentCourse = {};
  this.setCurrentCourse = function (data) {
    currentCourse = data;
  };
  this.getCurrentCourse = function () {
    return currentCourse;
  };

  this.getCourseRecommendations = function () {
    var userId = UserService.getCurrentUser().sjsuId;
    return $http.get('/student/getRecommendedCourses/' + userId);
  };

  this.getUdacityCourses = function (courseName) {
    return $http.get('/resources//getUdacityRecommendations/' + courseName);
  }

  this.getEnrolledCourses = function () {
    var userId = UserService.getCurrentUser().userMail;
    console.log("In student service Hit :-----> " + userId);
    return $http.get('/student/getEnrolledCourses/' + userId);
  };

  this.getAssignments = function (courseId) {
    var userId = UserService.getCurrentUser().userMail;
    console.log("In student service Hit :-----> " + userId);
    return $http.get('/student/getAssignments/' + courseId + '/' + userId);
  };

  this.getQuizzes = function (courseId) {
    var userId = UserService.getCurrentUser().userMail;
    console.log("In student service Hit :-----> " + userId);
    return $http.get('/student/getQuizzes/' + courseId + '/' + userId);
  };

}]);
