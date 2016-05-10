'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('QuizCtrl', ['$scope', '$stateParams', 'CourseService', 'AlertService',

  function ($scope, $stateParams, CourseService, AlertService) {

    var courseId = $stateParams.courseId;

    var loadData = function () {
      CourseService.getDetailsForQuiz(courseId).success(function (data, status) {
        console.log(JSON.stringify(data));
        $scope.courseName = data.name;
        $scope.courseCode = data.code;
        var tempData = (data.peoplesoftId).toString();
        console.log(">>>>"+tempData);
        $scope.filterData = tempData;
      }).error(function (data, status) {
        console.log(data);
      });
    };
    loadData();
  }]);
