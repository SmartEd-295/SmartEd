'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('UserProfileCtrl', ['$scope', 'UserService', 'AlertService',

  function ($scope, UserService, AlertService) {

    // load data from user service
    $scope.currentUser  = {};
    var matchPassword = '';

    var getUserDetails = function() {
      console.log("----------> in ctrl");
      UserService.getUserDetails().success(function (data, status) {
          console.log("----------> in service success");

          console.log(data);
          $scope.currentUser = data;
          matchPassword = data.password;
        })
        .error(function (data, status) {
          AlertService.displayMessage(data.message, 'error');
        });
    };
    getUserDetails();

    $scope.update = function() {
      console.log('--------> in update ' + JSON.stringify($scope.currentUser));
      var encodedPassword = atob(matchPassword);

      if($scope.currentUser.oldPassword != encodedPassword) {
        var errMsg = 'Incorrect Old Password. Please enter again.';
        AlertService.displayMessage(errMsg, 'error');
      } else {
        if($scope.currentUser.newPassword === undefined || $scope.currentUser.newPassword == '') {
            $scope.currentUser.newPassword = atob($scope.currentUser.password);
        }

        UserService.updateUser($scope.currentUser).success(function (data, status) {
          AlertService.displayMessage(data, 'success');
        }).error(function (data, status) {
          AlertService.displayMessage(data, 'error');
        });


      }
    }

  }])
