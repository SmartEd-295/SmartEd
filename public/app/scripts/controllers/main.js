'use strict';
/**
 * @ngdoc function
 * @name smartedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smartedApp
 */
angular.module('smartedApp')
  .controller('WrapperController', ['$state','$scope','UserService', function($state,$scope,UserService) {
      if (UserService.getCurrentUserRole() == 'Professor'){
        $state.go('dashboard.professor');
      } else if (UserService.getCurrentUserRole() == 'Student') {
        $state.go('dashboard.student');
      } else if(UserService.getCurrentUserRole() == 'Admin') {
        $state.go('dashboard.admin');
      }
  }]);
