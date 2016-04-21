'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('SidebarCtrl', ['$scope', 'UserService',

  function ($scope, UserService) {

    $scope.collapseVar = 0;
    $scope.multiCollapseVar = 0;

    $scope.check = function(x){
      if(x==$scope.collapseVar)
        $scope.collapseVar = 0;
      else
        $scope.collapseVar = x;
    };

    $scope.multiCheck = function(y){

      if(y==$scope.multiCollapseVar)
        $scope.multiCollapseVar = 0;
      else
        $scope.multiCollapseVar = y;
    };

    if (UserService.getCurrentUserRole() == 'Professor'){
      $scope.userRole = "Professor";
    } else if (UserService.getCurrentUserRole() == 'Student') {
      $scope.userRole = "Student";
    } else if(UserService.getCurrentUserRole() == 'Admin') {
      $scope.userRole = "Admin";
    }
  }]);
