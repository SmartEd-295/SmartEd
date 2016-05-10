'use strict';

var myApp = angular.module('smartedApp');

myApp.service('FilesService', ['$http', 'UserService', function ($http, UserService) {

  this.getAllFiles = function (courseId) {
    var userId =  UserService.getCurrentUser().userMail;
    return $http.get('/files/getAllFiles/' + courseId + '/' + userId );
  };


}]);
