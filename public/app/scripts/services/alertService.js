'use strict';

var myApp = angular.module('smartedApp');

/*  IF YOU WANT TO PERSIST ALERTS BETWEEN DIFFERENT SCREENS(SCOPES) THEN MAKE
 USE OF GLOBAL FUNCTIONS. BUT MAKE SURE AT THAT TIME YOU ARE NOT CALLING CLEARALERTS()
 IN RESPECTIVE CONTROLLER.
 */

myApp.service('AlertService', ['$rootScope', 'ngNotify', function ($rootScope, ngNotify) {
  var service = {};

  // Available types: success, info, warn, error, grimace
  service.displayMessage = function (message, type) {
    ngNotify.set(message, {
      type: type
    });
  };

  service.displayStickyMessage = function (message, type) {
    ngNotify.set(message, {
      type: type,
      sticky: true
    });
  };

  service.displayBoxMessage = function (message, containerId, type) {
    ngNotify.set(message, {
      type: type,
      target: '#'+containerId
    });
  };

  return service;

}]);
