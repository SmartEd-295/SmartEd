'use strict';

angular.module('smartedApp')
	.directive('headerBar',function(){
		return {
        templateUrl:'scripts/directives/header-bar/header-bar.html',
        restrict: 'E',
        replace: true
    	}
	});


