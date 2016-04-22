'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('ResetCtrl', ['$scope', '$location', 'UserService', 'AlertService',

  function ($scope, $location, UserService, AlertService) {

    $scope.resetPassword = function () {
      var tempData = UserService.getTempData();
      var oldPwd = tempData.tempPass;
      var userMail = tempData.userMail;

      var enteredPwd = $scope.user.tempPassword;

      if (oldPwd == enteredPwd) {
        $scope.user.email = userMail;
        UserService.updatePassword($scope.user).success(function (data, status) {
          AlertService.displayMessage(data, 'success');
          $location.path('/login');
        }).error(function (data, status) {
          AlertService.displayMessage(data, 'error');
        });
      } else {
        AlertService.displayMessage('Your temporary password is wrong, please check your mail.', 'error');
      }
    }

  }]);
