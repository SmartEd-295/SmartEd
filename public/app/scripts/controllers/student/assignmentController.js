'use strict';

var myApp = angular.module('smartedApp');

// student Assignment controller
myApp.controller('StudentAssignmentPerformanceCtrl', ['$scope', '$filter', '$sce', 'StudentService', 'AlertService', 'UtilityService',
  function ($scope, $filter, $sce, StudentService, AlertService, UtilityService) {

    // Flag to display visualizations or not
    $scope.displayStats1 = true;
    $scope.displayStats2 = true;

    // load course data
    var mCourse = StudentService.getCurrentCourse();
    $scope.currentCourse = mCourse;

    //Assignments
    var assignmentList = [];
    var getAllAssignments = function () {
      StudentService.getAssignments(mCourse.id).success(function (data, status) {
        // assignment list from response
        assignmentList = JSON.parse(data);

        // manipulate any assignment data
        for (var i = 0; i < assignmentList.length; i++) {
          assignmentList[i].description = $sce.trustAsHtml(assignmentList[i].description);
        }

        // load data to chart
        $scope.assignmentList = assignmentList;
        displayBarChart(assignmentList);
        displayTimelineChart(assignmentList);

      }).error(function (data, status) {
        AlertService.displayBoxMessage(data, 'studentAssignmentPerformanceContainer', 'error');
      });
    };
    getAllAssignments();


    // display bar chart
    var displayBarChart = function (result) {
      console.log("Display Bar Chart >>>>>>>>");
      var title = "Scores & Performance",
        subTitle = mCourse.name,
        seriesName1 = "Your Score",
        seriesName2 = "Max Score",
        containerId = "studentAssignmentGradesContainer";

      var data1 = [];
      var data2 = [];
      var dataLength = result.length;

      for (var j = 0; j < dataLength; j += 1) {
        var obj = result[j];
        if (!(obj === undefined || obj.submission === undefined || obj.submission.score === undefined)) {
          var scoreVal = obj.submission.score;
          if (!(scoreVal === undefined || scoreVal == '' || scoreVal == null)) {
            data1.push(scoreVal);
            data2.push(obj.points_possible);
          }
        }
      }

      if (!(data1 === undefined || data1.length == 0))
        UtilityService.draw3dBarChart(containerId, title, subTitle, seriesName1, data1, seriesName2, data2);
      else
        $scope.displayStats1 = false;
    };

    // display timeline chart
    var displayTimelineChart = function (result) {
      var title = "Submissions Timeline",
        subTitle = mCourse.name,
        yAxisLabel = "Timeline Range",
        seriesName = "Dates",
        containerId = "studentSubmissionTimelineContainer";

      var data = [];
      var categories = [];
      var dataLength = result.length;

      for (var j = 0; j < dataLength; j += 1) {
        var obj = result[j];
        if (!(obj === undefined)) {
          categories.push('Assignment ' + (j + 1));

          var startDate = new Date(obj.created_at);
          var endDate = new Date(obj.due_at);
          var dateRangeEntry = [];
          dateRangeEntry.push(startDate.getTime());
          dateRangeEntry.push(endDate.getTime());

          if (!(startDate === undefined || endDate === undefined || dateRangeEntry === undefined)) {
            data.push(dateRangeEntry);
          }
        }
      }

      if (!(data === undefined || data.length == 0))
        UtilityService.drawAssignmentTimeline(containerId, title, subTitle, categories, yAxisLabel, seriesName, data);
      else
        $scope.displayStats2 = false;
    };

  }]);
