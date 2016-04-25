'use strict';

var myApp = angular.module('smartedApp');

myApp.service('CourseService', ['$http', 'UserService', 'CourseContentService', function ($http, UserService, ContentService) {

  this.getAllCourses = function () {
    var userMail = UserService.getCurrentUser().userMail;
    return $http.get('/professor/getProfessorCourseDetails/'+ userMail);
    //return $http.get('/courses/'+ userId  + '/getAllCourses');
  };

  this.getCourseDetails = function (courseId) {
    return $http.get('/course/getCourseDetails/' + courseId );
  };

  this.addCourseContent = function() {
    return ContentService.addCourseContent(courseId, data);
  }
}]);
