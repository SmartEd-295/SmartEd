'use strict';
var myApp = angular.module('myApp');

myApp.controller('HeaderController', ['$scope', '$location', 'UserService',
function($scope, $location, UserService) {

    $scope.UserService = UserService;

    /*  IF USER IS LOGGED IN THEN DISPLAY HIM THE DIFFERENT HEADER AND ALSO SET THE
        ENVIRONMENT THE USER LOGGED IN.
    */
    var refresh = function(){
      var currentUser = UserService.getCurrentUser();
      if(currentUser != undefined){
        $scope.isLoggedIn = true;
        $scope.environment = currentUser.environment;
      }
    }
    refresh();

    /*  SET WHICH TAB WILL BE ACTIVE.
    */
    $scope.getClass = function(currentPath){
      var path = $location.path();
      if(path == currentPath || (currentPath == '/payment' && ((path.search('/createPayment') != -1) || (path.search('/viewPayment') != -1))))
        return "selected-header";
      else
        return "unselected-header";
    }

    /*  REDIRECT TO LOGIN PAGE, LOGIN CONTROLLER WILL TAKE CARE TO INVALIDATE
        THE USER.
    */
    $scope.logout = function(){
        $location.path('/#/login');
	}

}])
