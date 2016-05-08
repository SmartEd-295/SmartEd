'use strict';

angular.module('smartedApp')
	.directive('headerNotification',function(){
		return {
        templateUrl:'scripts/directives/header-notification/header-notification.html',
        controller: 'HeaderNotificationCtrl',
        restrict: 'E',
        replace: true
    	}
	});


