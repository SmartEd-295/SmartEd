'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('SidebarCtrl', ['$scope', '$state', 'UserService', 'CourseService',

  function ($scope, $state, UserService, CourseService) {

    $scope.courseList = [];
    // dynamic sidebar logic
    var currentRole = UserService.getCurrentUserRole();
    if (currentRole == 'Professor') {
      $scope.userRole = "Professor";

      $scope.goToState = "dashboard.professor";
      CourseService.getAllCourses().success(function (data, status) {
        $scope.courseList = data;
      }).error(function (data, status) {
        console.log(data);
      });
    } else if (currentRole == 'Student') {
      $scope.userRole = "Student";
      $scope.goToState = "dashboard.student";
    } else if (currentRole == 'Admin') {
      $scope.userRole = "Admin";
      $scope.goToState = "dashboard.admin";
    }


    // toggle dropdown logic
    $scope.collapseVar = 0;
    $scope.check = function (x) {
      if (x == $scope.collapseVar)
        $scope.collapseVar = 0;
      else
        $scope.collapseVar = x;
    };
  }]);
