'use strict';

var myApp = angular.module('sbAdminApp');

myApp.controller('RegisterCtrl',['$scope', '$location', 'UserService' , 'AlertService',

    function($scope, $location, UserService, AlertService) {

      var closeAlerts = function(){
    		AlertService.clearFlashMessage($scope);
    	}
    	$scope.closeAlert = closeAlerts;
    	closeAlerts();

    $scope.register = function() {
      console.log($scope.user);

      UserService.createUser($scope.user).success(function(data, status) {
        AlertService.SuccessGlobal(data);
        $location.path('/login');
      }).error( function (data, status) {
        AlertService.Error($scope, data);
      });
    	}
  }]);
