'use strict';

var myApp = angular.module('smartedApp');

// student Quiz controller
myApp.controller('StudentQuizPerformanceCtrl', ['$scope', '$sce', 'StudentService', 'AlertService',
  function ($scope, $sce, StudentService, AlertService) {

    // load course data
    var mCourse = StudentService.getCurrentCourse();
    $scope.currentCourse = mCourse;

    //Quizzes
    var quizList = [];
    var getAllQuizzes = function () {
      StudentService.getQuizzes(mCourse.id).success(function (data, status) {
        // assignment list from response
        quizList = JSON.parse(data);

        // manipulate any quiz data
        for (var i = 0; i < quizList.length; i++) {
          quizList[i].description = $sce.trustAsHtml(quizList[i].description);
        }

        // load data to chart
        $scope.quizList = quizList;

      }).error(function (data, status) {
        AlertService.displayBoxMessage(data, 'studentQuizPerformanceContainer', 'error');
      });
    };
    getAllQuizzes();

  }]);
