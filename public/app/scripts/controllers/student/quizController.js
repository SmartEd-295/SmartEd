'use strict';

var myApp = angular.module('smartedApp');

// student Quiz controller
myApp.controller('StudentQuizPerformanceCtrl', ['$scope', '$filter', '$sce', 'ngTableParams', 'StudentService', 'AlertService', 'UtilityService',
  function ($scope, $filter, $sce, ngTableParams, StudentService, AlertService, UtilityService) {


    // Flag to display visualizations or not
    $scope.displayStats1 = true;
    $scope.displayStats2 = true;

    // load course data
    var mCourse = StudentService.getCurrentCourse();
    $scope.currentCourse = mCourse;
    console.log(" - StudentQuizPerformanceCtrl---------> : " + mCourse);

    //Quizzes
    var quizList = [];
    var getAllQuizzes = function () {
      StudentService.getQuizzes(mCourse.id).success(function (data, status) {
        // assignment list from response
        quizList = JSON.parse(data);

        // manipulate any assignment data

        // load data to chart
        $scope.quizList = quizList;

      }).error(function (data, status) {
        AlertService.displayBoxMessage(data, 'studentQuizPerformanceContainer', 'error');
      });
    };
    getAllAssignments();


    /*// load table with data code
     var loadTableData = function() {
     $scope.tableParams = new ngTableParams({
     page: 1,
     count: 10
     }, {
     total: assignmentList.length,
     getData: function ($defer, params) {

     var orderedData = params.sorting ?
     $filter('orderBy')(assignmentList, params.orderBy()) :
     assignmentList;
     orderedData = params.filter ?
     $filter('filter')(orderedData, params.filter()) :
     orderedData;

     var resultData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

     params.total(orderedData.length);
     $defer.resolve(resultData);
     }
     });

     $scope.tableParams.reload();
     };*/

  }]);
