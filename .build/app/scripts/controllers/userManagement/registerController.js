'use strict';

var myApp = angular.module('sbAdminApp',[]);

myApp.controller('RegisterCtrl',['UserService' ,

    function($scope,$position, UserService) {

    $scope.register = function() {
      console.log($scope.user);
    	  	UserService.createUser($scope.user).success( function (data, status) {
//    		    AlertService.SuccessGlobal(data);
//    			  $location.path('/login');
    	  	}).error( function (data, status) {
//    		  	AlertService.Error($scope, data);
    	  	});
    	}
  }]);

//myApp.controller('RegisterController', ['$scope', '$location', 'UserService', 'AlertService',
//function($scope, $location, UserService, AlertService) {
//
//  var closeAlerts = function(){
//		AlertService.clearFlashMessage($scope);
//	}
//	$scope.closeAlert = closeAlerts;
//	closeAlerts();
//
//
//	/*	CREATE A USER FOR THE FIRST TIME.
//	*/
//    $scope.register = function() {
//	  	UserService.createUser($scope.user).success( function (data, status) {
//		    AlertService.SuccessGlobal(data);
//			  $location.path('/login');
//	  	}).error( function (data, status) {
//		  	AlertService.Error($scope, data);
//	  	});
//	}
//}])
