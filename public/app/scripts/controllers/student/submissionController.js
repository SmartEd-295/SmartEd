'use strict';

var myApp = angular.module('smartedApp');

// student Assignment controller
myApp.controller('StudentSubmissionPerformanceCtrl', ['$scope', '$filter', '$sce', 'StudentService', 'AlertService', 'UtilityService',
  function ($scope, $filter, $sce, StudentService, AlertService, UtilityService) {

    // load course data
    var mCourse = StudentService.getCurrentCourse();
    $scope.currentCourse = mCourse;

    //Assignments
    var missingSubmissionList = [];
    var getMissingSubmissions = function () {
      StudentService.getMissingSubmissions().success(function (data, status) {
        // assignment list from response
        missingSubmissionList = JSON.parse(data);

        // manipulate any assignment data
        for (var i = 0; i < missingSubmissionList.length; i++) {
          missingSubmissionList[i].description = $sce.trustAsHtml(missingSubmissionList[i].description);
        }

        // load data to chart
        $scope.missingSubmissionList = missingSubmissionList;


      }).error(function (data, status) {
        AlertService.displayBoxMessage(data, 'studentSubmissionPerformanceContainer', 'error');
      });
    };
    getMissingSubmissions();

  }]);
