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
  .controller('StudentDashboardCtrl', ['$state','$scope','UserService', function($state,$scope,UserService) {
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
