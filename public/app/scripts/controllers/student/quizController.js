'use strict';

var myApp = angular.module('smartedApp');

// Quiz performance
myApp.controller('StudentQuizPerformanceCtrl', ['$scope', '$filter', 'ngTableParams', 'StudentService', 'AlertService', 'UtilityService',
  function ($scope, $filter, ngTableParams, StudentService, AlertService, UtilityService) {

    var mCourse = StudentService.getCurrentCourse();
    $scope.currentCourse = mCourse;
    console.log(" - StudentQuizPerformanceCtrl---------> : " + mCourse);

    // Quizzes
    var quizList = [];
    var getAllQuizzes = function () {
      StudentService.getQuizzes(mCourse.id).success(function (data, status) {
        quizList = JSON.parse(data);
        //displayChart(quizList);
        console.log(" - i  student performance getallquizzes ctrl---------> : " + JSON.parse(data) + " : " + quizList.length);
      }).error(function (data, status) {
        AlertService.displayBoxMessage(data, 'studentQuizPerformanceContainer', 'error');
      });

    };
    getAllQuizzes();


    var displayChart = function (result) {
      var title = "Quizzes",
        seriesName = "Your Performance",
        containerId = "studentQuizPerformanceContainer";

      var data = [];
      var dataLength = result.length;

      for (var j = 0; j < dataLength; j += 1) {
        var obj = result[j];
        if (j == 0) {
          data.push(obj.submission);
        } else {
          data.push({
            name: obj.name + " (" + obj.alias + ")",
            y: obj.value
          });
        }
      }

      UtilityService.draw3dBarChart(containerId, title, seriesName, data);
    };


  }]);
