'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('StudentCtrl', ['$scope', 'ngTableParams', '$filter', 'StudentService', 'AlertService',
  function ($scope, ngTableParams, $filter, StudentService, AlertService) {

    var recommendedCourseList = [];

    var loadData = function() {
      StudentService.getCourseRecommendations().success(function (data, status) {
        recommendedCourseList = data[0].recommendations;
        $scope.recommendedCourseList = recommendedCourseList;

      }).error(function (data, status) {
        AlertService.displayMessage(data, 'error');
      });
    };
    loadData();


    $scope.tableParams = new ngTableParams({
      page: 1,
      count: 10
    }, {
      total: recommendedCourseList.length,
      getData: function ($defer, params) {

        var orderedData = params.sorting ?
          $filter('orderBy')(recommendedCourseList, params.orderBy()) :
          recommendedCourseList;
        orderedData = params.filter ?
          $filter('filter')(orderedData, params.filter()) :
          orderedData;

        var resultData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

        params.total(orderedData.length);
        $defer.resolve(resultData);
      }
    });
  }
  ]);
