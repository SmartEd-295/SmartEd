'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('SidebarCtrl', ['$scope', 'UserService',

  function ($scope, UserService) {

    var currentRole = UserService.getCurrentUserRole();

    if (currentRole == 'Professor'){
      $scope.userRole = "Professor";
    } else if (currentRole == 'Student') {
      $scope.userRole = "Student";
    } else if(currentRole == 'Admin') {
      $scope.userRole = "Admin";
    }


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

    $scope.addProfessor = function(){
      console.log("Came in Controller");
      alert("Add my loving professor, thanks!");
    };


  }]);
