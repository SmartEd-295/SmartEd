'use strict';

var myApp = angular.module('smartedApp');

myApp.service('MessageService', ['$http', 'UserService', function ($http, UserService) {

  this.getAllMesssages = function () {
    var userId =  UserService.getCurrentUser();
    return $http.get('/messages/ ' + userId + ' /getAllMessages');
  };

  this.getPersonalMessages = function () {
    var userId =  UserService.getCurrentUser();
    return $http.get('/messages/ ' + userId + ' /getPersonalMessages');
  };

  this.sendMessage = function (message) {
    return $http.get('/messages/addMessage', message);
  };

}]);
