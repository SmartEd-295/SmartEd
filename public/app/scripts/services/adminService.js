'use strict';

var myApp = angular.module('smartedApp');

myApp.service('AdminService', ['$http', function ($http) {

  this.addProfessor = function (user) {
    return $http.post('/user/registerProfessor', user);
  };

  this.getProfessorCourseDetails = function () {
    return $http.get('/professor/getProfessorCourseDetails');
  };

  this.getAllProfessors = function () {
    return $http.get('/professor/getAllProfessors');
  };



  this.getCourses = function () {
    return $http.get('/course/getCourseDetails');
  };
}]);
