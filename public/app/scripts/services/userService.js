'use strict';

var myApp = angular.module('sbAdminApp');

myApp.service('UserService', ['$http','$cookieStore', '$rootScope', function($http, $cookieStore, $rootScope) {

  this.createUser = function (user) {
    console.log("Came here:"+user);
	  return $http.post('/user/register', user);
  }

  this.validateUser = function(user){
	  return $http.post('/user/signin',user);
  }

  this.setCredentials = function(userId, email, role) {
	   $rootScope.globals = {
          currentUser: {
              userId: userId,
              userMail: email,
              role: role
          }
      };
     $cookieStore.put('globals', $rootScope.globals);
  }

  this.clearCredentials = function() {
      $rootScope.globals = {};
      $cookieStore.remove('globals');
  }

  this.isLoggedIn = function(){
	  $rootScope.globals = $cookieStore.get('globals') || {};

	  if ($rootScope.globals.currentUser)
		  return true;
	  else
		  return false;
  }

  this.getCurrentUser = function(){
    $rootScope.globals = $cookieStore.get('globals') || {};

    if ($rootScope.globals.currentUser)
      return $rootScope.globals.currentUser;
    else
      return undefined;
  }

 }]);
