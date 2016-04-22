'use strict';

var myApp = angular.module('smartedApp');

myApp.service('AdminService', ['$http', function ($http) {

  this.addProfessor = function (user) {
    return $http.post('/user/registerProfessor', user);
  };
}]);
