'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('AddProfessorCtrl', ['$scope', 'AdminService', 'AlertService',

  function ($scope, AdminService, AlertService) {

    $scope.addProfessor = function () {
      AdminService.addProfessor($scope.user).success(function (data, status) {
        AlertService.displayBoxMessage(data, 'addProfContainer', 'success');
      }).error(function (data, status) {
        AlertService.displayBoxMessage(data, 'addProfContainer', 'error');
      });
    };

  }]);
