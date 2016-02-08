'use strict';
var myApp = angular.module('myApp');

myApp.controller('RegisterController', ['$scope', '$location', 'UserService', 'AlertService',
function($scope, $location, UserService, AlertService) {

    /*	WHEN SCREEN LOADS CLOSE ANY ALERTS AND USED WHEN CLOSE BUTTON
	IN ALERT POPUP IS CLICKED
	*/
	var closeAlerts = function(){
		AlertService.clearFlashMessage($scope);
	}
	$scope.closeAlert = closeAlerts;
	closeAlerts();


	/*	CREATE A USER FOR THE FIRST TIME.
	*/
    $scope.register = function() {
	  	UserService.createUser($scope.user).success( function (data, status) {
		    AlertService.SuccessGlobal(data);
			  $location.path('/login');
	  	}).error( function (data, status) {
		  	AlertService.Error($scope, data);
	  	});
	}
}])
