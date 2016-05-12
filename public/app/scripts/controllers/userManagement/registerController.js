'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('RegisterCtrl', ['$scope', '$location', 'UserService', 'AlertService',

  function ($scope, $location, UserService, AlertService) {

    $scope.register = function () {
      UserService.createUser($scope.user).success(function (data, status) {
        AlertService.displayMessage(data, 'success');
        $location.path('/login');
      }).error(function (data, status) {
        AlertService.displayMessage(data, 'error');
      });
    }
  }]);
