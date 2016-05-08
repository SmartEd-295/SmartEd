'use strict';

var myApp = angular.module('smartedApp');

// header notifications controller
myApp.controller('HeaderNotificationCtrl', ['$scope', 'StudentService', 'UserService', 'MessageService', 'AlertService',
  function ($scope, StudentService, UserService, MessageService, AlertService) {

    var currentRole = UserService.getCurrentUserRole();
    if (currentRole == 'Professor') {
      $scope.userRole = "Professor";
    } else if (currentRole == 'Student') {
      $scope.userRole = "Student";
    } else if (currentRole == 'Admin') {
      $scope.userRole = "Admin";
    }

    // fetch message list
    var messageList = [];
    var loadMessages = function () {
      MessageService.getAllMesssages().success(function (data, status) {
          messageList = data;
          $scope.messageList = messageList;
        })
        .error(function (data, status) {
          AlertService.displayBoxMessage(data.message, 'error');
        });
    };

    // TO List
    var toDoList = [];
    var getToDoList = function () {
      StudentService.getToDoList().success(function (data, status) {
        toDoList = JSON.parse(data);
        if (!(toDoList === undefined || toDoList.length == 0)) {
          $scope.toDoList = toDoList;
        }
      }).error(function (data, status) {
        AlertService.displayBoxMessage(data, 'page-wrapper', 'error');
      });
    };

    var activityStream = [];
    var getActivityStream = function () {
      StudentService.getActivityStream().success(function (data, status) {
        activityStream = JSON.parse(data);
        if (!(activityStream === undefined || activityStream.length == 0)) {
          $scope.activityStream = activityStream;
        }
      }).error(function (data, status) {
        AlertService.displayBoxMessage(data, 'page-wrapper', 'error');
      });
    };

    if (currentRole == 'Student') {
      loadMessages();
      getToDoList();
      getActivityStream();
    }

  }]);
