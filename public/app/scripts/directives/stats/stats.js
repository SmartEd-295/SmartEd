'use strict';

angular.module('smartedApp')
  .directive('stats', function () {
    return {
      templateUrl: 'scripts/directives/stats/stats.html',
      restrict: 'E',
      replace: true,
      controller: 'StatsCtrl',
      scope: {
        'model': '=',
        'comments': '@',
        'number': '@',
        'category': '@',
        'name': '@',
        'colour': '@',
        'details': '@',
        'type': '@',
        'goto': '@',
        'action': '@'
      }

    }
  });
