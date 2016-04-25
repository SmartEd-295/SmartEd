'use strict';

var myApp = angular.module('smartedApp');

myApp.service('MessageService', ['$http', 'UserService', function ($http, UserService) {

  this.getAllMesssages = function () {
    var userId =  UserService.getCurrentUser().userMail;
    return $http.get('/message/getAllMessages/' + userId );
  };

  this.getAllSentMesssages = function () {
    var userId =  UserService.getCurrentUser().userMail;
    return $http.get('/message/getAllSentMessages/' + userId );
  };

  this.sendMessage = function (message) {
    return $http.post('/message/addMessage', message);
  };

}]);
