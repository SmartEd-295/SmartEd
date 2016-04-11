'use strict';

var myApp = angular.module('sbAdminApp');

myApp.controller('LoginCtrl',['$scope', '$location', 'UserService' , 'AlertService',

  function($scope, $location, UserService, AlertService) {

    /*	WHEN SCREEN LOADS CLOSE ANY ALERTS AND USED WHEN CLOSE BUTTON
     IN ALERT POPUP IS CLICKED
     */

    var closeAlerts = function(){
      AlertService.clearFlashMessage($scope);
    }
    $scope.closeAlert = closeAlerts;
    //closeAlerts();

    /*	WHENEVER LOGIN PAGE IS CALLED, CONTROLLER WILL BE INITIALIZED,
     AND THAT WILL CLEAR THE LOGGED IN USER FROM THE SCOPE OF THE
     APPLICATION.
     */
    var init = function() {
      UserService.clearCredentials();
    };
    init();


    /*	VALIDATE USER AGAINST THE DATABASE CREDENTIALS.
     */
    $scope.login = function() {
      var loggedUser = $scope.user;
      UserService.validateUser(loggedUser).success( function (data, status) {
        UserService.setCredentials(data._id, data.email, data.role);
        $location.path('/dashboard');
      }).error( function (data, status) {
        AlertService.Error($scope, data);
      });
    };
  }])
