'use strict';

var myApp = angular.module('smartedApp');

myApp.service('UserService', ['$http', '$cookieStore', '$rootScope', function ($http, $cookieStore, $rootScope) {

  var tempData = {};

  this.setTempData = function (data) {
    tempData = data;
  };

  this.getTempData = function () {
    return tempData;
  };

  this.createUser = function (user) {
    return $http.post('/user/register', user);
  };

  this.updatePassword = function (user) {
    return $http.post('/user/updatePassword', user);
  };

  this.validateUser = function (user) {
    return $http.post('/user/signin', user);
  };

  this.forgotPassword = function (email) {
    return $http.get('/user/retrievePassword?email=' + email);
  };

  this.setCredentials = function (userId, email, role) {
    $rootScope.globals = {
      currentUser: {
        userId: userId,
        userMail: email,
        role: role
      }
    };
    $cookieStore.put('globals', $rootScope.globals);
  };

  this.clearCredentials = function () {
    $rootScope.globals = {};
    $cookieStore.remove('globals');
  };

  this.isLoggedIn = function () {
    $rootScope.globals = $cookieStore.get('globals') || {};

    if ($rootScope.globals.currentUser)
      return true;
    else
      return false;
  };

  this.getCurrentUser = function () {
    var userDetails = $cookieStore.get('globals') || {};

    if (userDetails.currentUser)
      return userDetails.currentUser;
    else
      return undefined;
  };


  this.getCurrentUserRole = function () {
    var userDetails = $cookieStore.get('globals') || {};

    if (userDetails.currentUser)
      return userDetails.currentUser.role != undefined ? userDetails.currentUser.role : undefined;
    else
      return undefined;
  };

}]);
