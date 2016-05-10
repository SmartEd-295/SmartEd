'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('ShowCoursesCtrl', ['$scope', '$stateParams', '$state', 'CourseService', 'AlertService',

  function ($scope, $stateParams, $state, CourseService, AlertService) {

    var action = $stateParams.action;

    $scope.action = action;

    switch (action) {
      case 'GRADES':
        $scope.title = "Select Course to Review Grade Details";
        $scope.color = "primary";
        break;
      case 'AVERAGE_QUIZ':
        $scope.title = "Select Course to Review Average Quiz Performance";
        $scope.color = "success";
        break;
      case 'DETAILED_QUIZ':
        $scope.title = "Select Course to Review Detailed Quiz Score";
        $scope.color = "info";
        break;
    }

    $scope.courseList = [];
    var loadData = function () {
      CourseService.getAllCourses().success(function (data, status) {
        $scope.courseList = data;
      }).error(function (data, status) {
        console.log(data);
      });
    };
    loadData();

    $scope.viewDetails = function (courseId, term, year) {
      if (Number(year) > Number(new Date().getFullYear()) || Number(year) == Number(new Date().getFullYear())) {
        AlertService.displayMessage('You can only review details for the past courses.', 'error');
      } else {
        switch (action) {
          case 'GRADES':
            $state.go('dashboard.courseCharts', {courseId: courseId, term: term, year: year});
            break;
          case 'AVERAGE_QUIZ':
            $state.go('dashboard.professorAverageQuiz', {courseId: courseId});
            break;
          case 'DETAILED_QUIZ':
            $state.go('dashboard.professorDetailedQuiz', {courseId: courseId});
            break;
        }
      }
    };

  }]);
