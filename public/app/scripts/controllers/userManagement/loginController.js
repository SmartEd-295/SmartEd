'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('LoginCtrl', ['$scope', '$location', 'UserService', 'AlertService',

  function ($scope, $location, UserService, AlertService) {

    /*	WHENEVER LOGIN PAGE IS CALLED, CONTROLLER WILL BE INITIALIZED,
     AND THAT WILL CLEAR THE LOGGED IN USER FROM THE SCOPE OF THE
     APPLICATION.
     */
    var init = function () {
      UserService.clearCredentials();
    };
    init();


    /*	VALIDATE USER AGAINST THE DATABASE CREDENTIALS.
     */
    $scope.login = function () {
      var loggedUser = $scope.user;
      UserService.validateUser(loggedUser).success(function (data, status) {
        UserService.setCredentials(data._id, data.email, data.role, data.sjsuId);
        $location.path('/dashboard');
      }).error(function (data, status) {
        AlertService.displayMessage(data, 'error');
      });
    };

    $scope.forgotPassword = function () {
      var email = $scope.user != undefined ? $scope.user.email : undefined;
      if (undefined == email || "" == email) {
        AlertService.displayMessage('Please enter valid E-mail to retrieve your password.', 'error');
      } else {
        UserService.forgotPassword(email).success(function (data, status) {
          var randomPass = data.randomPass;
          var tempData = {
            userMail: email,
            tempPass: randomPass
          };
          UserService.setTempData(tempData);
          AlertService.displayMessage(data.message, 'success');
          $location.path('/reset');
        }).error(function (data, status) {
          AlertService.displayMessage(data, 'error');
        });
      }
    }
  }]);
