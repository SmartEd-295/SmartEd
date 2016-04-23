'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('ProfessorDetailsCtrl', ['$scope', 'AdminService', 'AlertService', 'ngTableParams', '$filter',

  function ($scope, AdminService, AlertService, ngTableParams, $filter) {

    console.log("Controller loaded successfully");
    var data = [];

    $scope.tableParams = new ngTableParams({
      page: 1,
      count: 10,
      sorting: {
        semesterYear: 'desc'
      }
    }, {
      total: data.length,
      getData: function($defer, params) {

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

    var refresh = function() {
      AdminService.getAllProfessors().success( function (result, status) {
        data = result;
        $scope.tableParams.reload();
      }).error( function (data, status) {

      });
    };
    refresh();

  }]);
