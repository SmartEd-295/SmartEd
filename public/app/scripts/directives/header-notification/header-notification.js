'use strict';

angular.module('smartedApp')
	.directive('headerNotification',function(){
		return {
        templateUrl:'scripts/directives/header-notification/header-notification.html',
        restrict: 'E',
        replace: true
    	}
	});


