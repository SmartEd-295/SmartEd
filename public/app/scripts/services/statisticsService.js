'use strict';

var myApp = angular.module('smartedApp');

myApp.service('StatisticsService', ['$http', 'UserService', function ($http, UserService) {

  this.getPersonalStatistics = function () {
    var userId =  UserService.getCurrentUser();
    var currentRole = UserService.getCurrentUserRole();

    if (currentRole == 'Professor'){
      return $http.post('/professor/getPerformance/'+ userId);
    } else if (currentRole == 'Student') {
      return $http.post('/student/getPerformance/'+ userId);
    }


  };
}]);
