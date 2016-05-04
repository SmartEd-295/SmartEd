'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('SidebarCtrl', ['$scope', '$state', 'UserService', 'CourseService', 'AlertService',

  function ($scope, $state, UserService, CourseService, AlertService) {

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


    $scope.collapseVar = 0;
    $scope.check = function (x) {
      if (x == $scope.collapseVar)
        $scope.collapseVar = 0;
      else
        $scope.collapseVar = x;
    };

    $scope.visitCourse = function(courseId, term, year){
      if(Number(year) > Number(new Date().getFullYear()) || Number(year) == Number(new Date().getFullYear())){
        AlertService.displayMessage('You can only see the performance of classes for past years.', 'error');
      }else{
        $state.go('dashboard.courseCharts', {courseId: courseId, term:term, year:year});
      }
    };

  }]);
