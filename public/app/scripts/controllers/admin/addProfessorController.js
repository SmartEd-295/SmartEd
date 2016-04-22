'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('AddProfessorCtrl',['$scope', '$location', 'UserService' , 'AlertService',

  function($scope, $location, UserService, AlertService) {

    AlertService.displayBoxMessage('This is just a simple test', 'addProfCotainer', 'success');

    $scope.register = function() {
      console.log("Hello");
      AlertService.clearFlashMessage($scope);

      /*UserService.createUser($scope.user).success(function(data, status) {
        AlertService.SuccessGlobal(data);
        $location.path('/login');
      }).error( function (data, status) {
        AlertService.Error($scope, data);
      });*/
    }
  }]);
