'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('UserProfileCtrl', ['$scope', '$location', 'UserService', 'AlertService',

  function ($scope, UserService, AlertService) {

    // load data from user service

    UserService.getUserCanvasProfile().success(function (data, status) {
        console.log(data);
      })
      .error(function (data, status) {
        AlertService.displayBoxMessage(data.message, 'error');
      });

  }])
