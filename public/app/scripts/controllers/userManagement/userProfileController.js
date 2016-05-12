'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('UserProfileCtrl', ['$scope', 'UserService', 'AlertService',

  function ($scope, UserService, AlertService) {

    // load data from user service
    $scope.currentUser = {};
    var matchPassword = '';

    var getUserDetails = function () {
      UserService.getUserDetails().success(function (data, status) {
          $scope.currentUser = data;
          matchPassword = data.password;
        })
        .error(function (data, status) {
          AlertService.displayMessage(data.message, 'error');
        });
    };
    getUserDetails();


    $scope.changePassword = function () {
      var encodedPassword = atob(matchPassword);

      if ($scope.currentUser.oldPassword != encodedPassword) {
        var errMsg = 'Incorrect Old Password. Please enter again.';
        AlertService.displayMessage(errMsg, 'error');
      } else {
        if ($scope.currentUser.rePassword != $scope.currentUser.password) {
          var errMsg = 'Passwords do not match. Please try again.';
          AlertService.displayMessage(errMsg, 'error');
        } else {
          UserService.updatePassword($scope.currentUser).success(function (data, status) {
            AlertService.displayMessage(data, 'success');
          }).error(function (data, status) {
            AlertService.displayMessage(data, 'error');
          });
        }
      }

    };

    $scope.update = function () {
      UserService.updateUser($scope.currentUser).success(function (data, status) {
        AlertService.displayMessage(data, 'success');
      }).error(function (data, status) {
        AlertService.displayMessage(data, 'error');
      });
    };

    var getRandomImage = function () {
      UserService.getRandomUser().success(function (data, status) {
        var userData = data;
        $scope.imageUrl = userData.results[0].picture.large;
      }).error(function (data, status) {
      });
    };

  }]);
