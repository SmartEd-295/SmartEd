'use strict';

angular.module('smartedApp')
  .controller('DashboardCtrl', ['$state','$scope','UserService', function($state,$scope,UserService) {
      var currentRole = UserService.getCurrentUserRole();
      if (currentRole == 'Professor'){
        $state.go('dashboard.professor');
      } else if (currentRole == 'Student') {
        $state.go('dashboard.student');
      } else if(currentRole == 'Admin') {
        $state.go('dashboard.admin');
      }
  }])
  .controller('StudentDashboardCtrl', ['$state','$scope','UserService', 'StudentService', function($state,$scope,UserService, StudentService) {
    var currentRole = UserService.getCurrentUserRole();

    // load data from user service
    $scope.currentUser  = {};

    var getUserDetails = function() {
      console.log("----------> in ctrl");
      UserService.getUserDetails().success(function (data, status) {
          console.log("----------> in service success");

          console.log(data);
          $scope.currentUser = data;
        })
        .error(function (data, status) {
        });
    };
    getUserDetails();

    var getStudentCourses = function() {
      StudentService.getEnrolledCourses().success(function (data, status) {
        var parsedData = JSON.parse(data);
        $scope.dashboardStudentCourseList = parsedData;
        console.log($scope.dashboardStudentCourseList);

        var colorList = [];
        for(var i=0; i < parsedData.length; i++) {
            colorList[i] = getRandomColor();
        }
        $scope.colorList = colorList;
      }).error(function (data, status) {
        console.log(data);
      });
    } ;
    getStudentCourses();

    function getRandomColor() {
      var letters = ['success','default','warning','primary','info','danger'];
      var color = 'info';
      for (var i = 0; i < 6; i++ ) {
        color = letters[Math.floor(Math.random() * 6)];
      }
      return color;
    };

  }])
  .controller('ProfessorDashboardCtrl', ['$state','$scope','UserService', function($state,$scope,UserService) {
  var currentRole = UserService.getCurrentUserRole();

  // load data from user service
  $scope.currentUser  = {};

  var getUserDetails = function() {
    console.log("----------> in ctrl");
    UserService.getUserDetails().success(function (data, status) {
        console.log("----------> in service success");

        console.log(data);
        $scope.currentUser = data;
      })
      .error(function (data, status) {
      });
  };
  getUserDetails();

}]);
