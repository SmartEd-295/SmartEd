'use strict';

var myApp = angular.module('sbAdminApp');

/*  IF YOU WANT TO PERSIST ALERTS BETWEEN DIFFERENT SCREENS(SCOPES) THEN MAKE
    USE OF GLOBAL FUNCTIONS. BUT MAKE SURE AT THAT TIME YOU ARE NOT CALLING CLEARALERTS()
    IN RESPECTIVE CONTROLLER.
*/

myApp.service('AlertService', ['$rootScope', function($rootScope) {
    var service = {};

    service.Success = Success;
    service.Error = Error;
    service.clearFlashMessage = clearFlashMessage;
    service.SuccessGlobal = SuccessGlobal;
    service.ErrorGlobal = ErrorGlobal;
    service.DetailedError = DetailedError;
    service.DetailedErrorGlobal = DetailedErrorGlobal;
    service.DisplayError = DisplayError;

    return service;

    function clearFlashMessage(scope) {
        var flash = scope.flash;
        if (flash) {
            delete scope.flash;
        }

        var globalFlash = $rootScope.flash;
        if (globalFlash) {
           delete $rootScope.flash;
        }
    }

    function Success(scope, message) {
        scope.flash = {
            message: message,
            type: 'success'
        };
    }

    function Error(scope, message) {
        scope.flash = {
            message: message,
            type: 'error'
        };
    }

    function DetailedError(scope, data) {

        var message = data.message;

        if(data.isErrorData != undefined && data.isErrorData == true){
          var detailMessage = data.detailMessage;
          scope.flash = {
              showDetailsButton : true,
              message: message,
              detailMessage : detailMessage,
              type: 'error'
          };
        }else{
          scope.flash = {
              showDetailsButton : false,
              message: message,
              type: 'error'
          };
        }
    }

    function SuccessGlobal(message) {
       $rootScope.flash = {
            message: message,
            type: 'success'
        };
    }

    function ErrorGlobal(message) {
        $rootScope.flash = {
            message: message,
            type: 'error'
        };
    }

    function DetailedErrorGlobal(data) {

        var message = data.message;

        if(data.isErrorData != undefined && data.isErrorData == true){
          var detailMessage = data.detailMessage;
          $rootScope.flash = {
              showDetailsButton : true,
              message: message,
              detailMessage : detailMessage,
              type: 'error'
          };
        }else{
          $rootScope.flash = {
              showDetailsButton : false,
              message: message,
              type: 'error'
          };
        }
    }

    function DisplayError(scope, ModalService){
      var displayMessage = scope.flash.detailMessage;
      ModalService.showModal({
        templateUrl: "/app/views/dialogBox.html",
        controller: "DialogController",
        backdrop: 'static',
        inputs: {
          title: 'Error Details',
          message : displayMessage,
          buttonText: '',
          mode: 'JSON_DISPLAY'
        }
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {});
      });
    }

}]);
