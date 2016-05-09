'use strict';

var myApp = angular.module('smartedApp');

// header notifications controller
myApp.controller('HeaderNotificationCtrl', ['$scope', '$filter', 'StudentService', 'UserService', 'MessageService', 'AlertService',
  function ($scope, $filter, StudentService, UserService, MessageService, AlertService) {

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

          for(var i=0; i < messageList.length; i++) {
            var tStamp = messageList[i].messageTimestamp;
            messageList[i].messageTimestamp = $filter('date')(tStamp, "dd MMM");
          }

          if (messageList.length > 4)
            messageList = messageList.slice(0,3);

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
          for(var i=0; i < toDoList.length; i++) {
            var tStamp = toDoList[i].assignment.due_at;
            toDoList[i].assignment.due_at = $filter('date')(tStamp, "MM/dd/yyyy");
          }

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
          setProgressBarClass();
        }
      }).error(function (data, status) {
        AlertService.displayBoxMessage(data, 'page-wrapper', 'error');
      });
    };



    var setProgressBarClass = function() {
      var widthValue = [];
      var classArray = [];
      for(var i =0; i < activityStream.length; i++) {
        var ratio = activityStream[i].unread_count / activityStream[i].count;
        if(ratio >= 0 && ratio < 0.25) {
          classArray.push('progress-bar-success');
        } else if(ratio > 0.24 && ratio < 0.5) {
          classArray.push('progress-bar-info');
        } else if(ratio > 0.49 && ratio < 0.75) {
          classArray.push('progress-bar-warning');
        } else if(ratio > 0.74 && ratio <= 1) {
          classArray.push('progress-bar-danger');
        }
        widthValue.push(( 1- ratio) * 100 );
      }
      $scope.progressBarClass = classArray;
      $scope.progressBarWidth = widthValue;

    }

    if (currentRole == 'Student') {
      loadMessages();
      getToDoList();
      getActivityStream();
    } else if (currentRole == 'Professor') {
      loadMessages();
    }

  }]);
