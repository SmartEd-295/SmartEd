'use strict';

angular.module('smartedApp')
  .directive('sidebar',function() {
    return {
      templateUrl:'scripts/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      controller: 'SidebarCtrl',
      scope: {
      }
    }
  });

