'use strict';

var myApp = angular.module('smartedApp');

myApp.service('CourseService', ['$http', 'UserService', 'CourseContentService', function ($http, UserService, ContentService) {

  this.getAllCourses = function () {
    console.log("in CourseService getallcourses ");
    //var userId =  UserService.getCurrentUser();
    var userMail = UserService.getCurrentUser().userMail;
    return $http.get('/professor/getProfessorCourseDetails/'+ userMail);
    //return $http.get('/courses/'+ userId  + '/getAllCourses');
  };

  this.getCourseDetails = function (courseId) {
    var userId =  UserService.getCurrentUser();
    return $http.get('/courses/'+ userId +'/getCourseDetails/' + courseId );
  };

  this.addCourseContent = function() {
    return ContentService.addCourseContent(courseId, data);
  }
}]);
