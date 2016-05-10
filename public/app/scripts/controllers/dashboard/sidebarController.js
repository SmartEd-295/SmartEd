'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('SidebarCtrl', ['$scope', 'UserService', 'StudentService',

  function ($scope, UserService, StudentService) {

    var currentRole = UserService.getCurrentUserRole();

    var loadStudentCourses = function () {
      StudentService.getEnrolledCourses().success(function (data, status) {
        var parsedData = JSON.parse(data);
        $scope.studentCourseList = parsedData;
      }).error(function (data, status) {
        console.log(data);
      });
    };

    switch (currentRole) {
      case 'Admin':
        $scope.userRole = "Admin";
        $scope.goToState = "dashboard.admin";
        break;
      case 'Professor':
        $scope.userRole = "Professor";
        $scope.goToState = "dashboard.professor";
        break;
      case 'Student':
        $scope.userRole = "Student";
        $scope.goToState = "dashboard.student";
        loadStudentCourses();
        break;
    }

    $scope.collapseVar = 0;
    $scope.check = function (x) {
      if (x == $scope.collapseVar)
        $scope.collapseVar = 0;
      else
        $scope.collapseVar = x;
    };

  }]);
