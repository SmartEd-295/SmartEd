'use strict';

var myApp = angular.module('sbAdminApp');

myApp.controller('ResetCtrl', ['$scope', '$location', 'UserService', 'AlertService',

  function ($scope, $location, UserService, AlertService) {

    var closeAlerts = function () {
      AlertService.clearFlashMessage($scope);
    }
    $scope.closeAlert = closeAlerts;

    $scope.resetPassword = function () {
      var tempData = UserService.getTempData();
      var oldPwd = tempData.tempPass;
      var userMail = tempData.userMail;

      var enteredPwd = $scope.user.tempPassword;

      if (oldPwd == enteredPwd) {
        $scope.user.email = userMail;
        UserService.updatePassword($scope.user).success(function (data, status) {
          AlertService.SuccessGlobal(data);
          $location.path('/login');
        }).error(function (data, status) {
          AlertService.Error($scope, data);
        });
      } else {
        AlertService.Error($scope, "Your temporary password is wrong, please check your mail.");
      }
    }

  }]);
