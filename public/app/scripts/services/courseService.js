'use strict';

var myApp = angular.module('smartedApp');

myApp.service('CourseService', ['$http', 'UserService', 'CourseContentService', function ($http, UserService, ContentService) {

  this.getAllCourses = function () {
    var userMail = UserService.getCurrentUser().userMail;
    return $http.get('/professor/getProfessorCourses/' + userMail);
  };

  this.getCourseDetails = function (courseId, term, year) {
    return $http.get('/course/getCourseDetails',{params:{"courseId": courseId, "term": term, "year": year}});
  };

  this.addCourseContent = function () {
    return ContentService.addCourseContent(courseId, data);
  }
}]);
