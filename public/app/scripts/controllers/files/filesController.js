'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('FilesCtrl', ['$scope', '$filter', 'ngTableParams', 'FilesService', 'AlertService', 'StudentService',

  function ($scope, $filter, ngTableParams, FilesService, AlertService, StudentService) {

    var data = [];
    $scope.displayLoading = true;
    $scope.displayEmptyFileList = true;


    $scope.tableParams = new ngTableParams({
      page: 1,
      count: 10,
      sorting: {
      }
    }, {
      total: data.length,
      getData: function ($defer, params) {

        var orderedData = params.sorting ?
          $filter('orderBy')(data, params.orderBy()) :
          data;
        orderedData = params.filter ?
          $filter('filter')(orderedData, params.filter()) :
          orderedData;

        var resultData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

        params.total(orderedData.length);
        $defer.resolve(resultData);
      }
    });

    var refresh = function () {

      var courseId = StudentService.getCurrentCourse().id;

      FilesService.getAllFiles(courseId).success(function (result, status) {
        $scope.displayLoading = false;
        data = JSON.parse(result);

        for(var i=0; i < data.length; i++) {
          var tStamp = data[i].updated_at;
          data[i].updated_at = $filter('date')(tStamp, "MM/dd/yyyy");
        }

        if(!(data === undefined || data.length == 0)) {
          $scope.displayEmptyFileList = false;
          $scope.tableParams.reload();
        }
      }).error(function (data, status) {
        AlertService.displayBoxMessage(data, 'filesContainer', 'error');
      });
    };
    refresh();


  }]);
