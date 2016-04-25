'use strict';

var myApp = angular.module('smartedApp');

myApp.service('MessageService', ['$http', 'UserService', function ($http, UserService) {

  this.getAllMesssages = function () {
    var userId =  UserService.getCurrentUser();
    return $http.get('/message/getAllMessages' + userId );
  };

  this.getPersonalMessages = function () {
    var userId =  UserService.getCurrentUser();
    return $http.get('/message/getPersonalMessages' + userId );
  };

  this.sendMessage = function (message) {
    return $http.get('/message/addMessage', message);
  };

}]);
