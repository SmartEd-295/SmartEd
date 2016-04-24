'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('SidebarCtrl', ['$scope', 'UserService', 'CourseService',

  function ($scope, UserService, CourseService) {

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


  $scope.courseList = [
    {courseid : "1111", name : "CMPE 202"},
    {courseid : "5555", name : "CMPE 272"},
    {courseid : "3333", name : "CMPE 273"},
    {courseid : "8888", name : "CMPE 275"},
    {courseid : "0000", name : "CMPE 239"}
  ];


    var myList = CourseService.getAllCourses().success(function (data, status) {
        //console.log(' SUCCESS ---------------> ' + JSON.stringify(data) + " : " + status) ;
        $scope.courseList = data;
    }).error(function (data, status) {
        console.log(' ERROR ---------------> ' + data + " : ") ;
    });


  }]);
