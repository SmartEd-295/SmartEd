'use strict';
var myApp = angular.module('myApp');

myApp.controller('DialogController', ['$scope', 'close', 'title', 'message', 'buttonText', 'mode', function($scope, close, title, message, buttonText, mode) {

	$scope.title =  title;
	$scope.message = message;

	if(mode == "ACTION"){
	  $scope.showActionButton = true;
	  $scope.buttonText = buttonText;
	  $scope.isPlainData = true;
	}else if(mode == "DISPLAY"){
	  $scope.showDisplayButton = true;
	  $scope.isPlainData = true;
	}else if(mode == "JSON_DISPLAY"){
	  $scope.showDisplayButton = true;
    $scope.isJsonData = true;
	}

	$scope.close = function(result) {
	  	close(result,500); // close, but give 500ms for bootstrap to animate
	};

}]);
