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
  }]);
