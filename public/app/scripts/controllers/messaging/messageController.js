'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('MessagingCtrl', ['$scope', '$filter',  '$uibModal', 'MessageService', 'AlertService',

  function ($scope, $filter, $uibModal, MessageService, AlertService) {

    $scope.activeTab = "inbox";
    var composeMail = {};

    var inboxMessageList = [];
    // fetch message list
    var loadMessages = function() {
      MessageService.getAllMesssages()
        .success(function (data, status) {
          inboxMessageList = data;
          for(var i=0; i < inboxMessageList.length; i++) {
            var tStamp = inboxMessageList[i].messageTimestamp;
            inboxMessageList[i].messageTimestamp = $filter('date')(tStamp, "MM/dd/yyyy");
          }
          $scope.emails = inboxMessageList;
        })
        .error(function (data, status) {
          AlertService.displayMessage(data.message, 'error');
        });
    };
    loadMessages();

    var sentMessageList = [];
    // fetch sent message list
    var loadSentMessages = function() {
      MessageService.getAllSentMesssages()
        .success(function (data, status) {
          sentMessageList = data;
          for(var i=0; i < sentMessageList.length; i++) {
            var tStamp = sentMessageList[i].messageTimestamp;
            sentMessageList[i].messageTimestamp = $filter('date')(tStamp, "MM/dd/YYYY");
          }
          $scope.sentEmails = sentMessageList;
        })
        .error(function (data, status) {
          AlertService.displayMessage(data.message, 'error');
        });
    };
    loadSentMessages();

    // ----------------

    $scope.setupInboxContent = function() {
      $scope.activeTab = "inbox";
      MessageService.getAllMesssages()
        .success(function (data, status) {
          $scope.emails = data;
        })
        .error(function (data, status) {
          AlertService.displayMessage(data.message, 'error');
        });
    };

    $scope.setupSentContent = function() {
      $scope.activeTab = "sent";
      MessageService.getAllSentMesssages()
        .success(function (data, status) {
          $scope.sentEmails = data;
        })
        .error(function (data, status) {
          AlertService.displayMessage(data.message, 'error');
        });
    };


    //------------------


    // compose popup functions
    $scope.showComposePopup = function(composeEmail) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/messaging/composeMessageModal.html',
        controller: 'ComposeMessageCtrl',
        resolve: {
          activeTab: function () {
            return $scope.activeTab;
          },
          composeEmail: function () {
            return composeEmail;
          }
        }
      });

      modalInstance.result.then(function (returnVal) {
        loadMessages();
        loadSentMessages();
      }, function () {
        //modal closed, do nothing
      });

    };

    // display popup functions
    $scope.showPopup = function(email) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/messaging/displayMessageModal.html',
        controller: 'DisplayMessageCtrl',
        resolve: {
          selectedEmail: function () {
            return email;
          },
          activeTab: function () {
            return $scope.activeTab;
          }
        }
      });

      modalInstance.result.then(function (returnEmail) {
        var composeEmail = {};
        composeEmail.toUser = returnEmail.fromUser;
        composeEmail.fromUser = returnEmail.toUser;
        composeEmail.subject = "Re: " + returnEmail.subject;
        composeEmail.content = returnEmail.content;

        $scope.showComposePopup(composeEmail);
      }, function () {
        //modal closed, do nothing
      });
    };

  }])
  .controller('ComposeMessageCtrl', ['$scope', '$uibModalInstance', 'MessageService', 'UserService', 'AlertService', 'activeTab', 'composeEmail',
  function ($scope, modal, MessageService, UserService, AlertService, activeTab, composeEmail) {

    $scope.activeTab = activeTab;
    $scope.composeEmail = composeEmail;

    $scope.sendEmail = function() {
      var toUser = $scope.composeEmail.toUser;
      var fromUser = UserService.getCurrentUser().userMail;
      $scope.composeEmail.fromUser = fromUser;
      UserService.isValidUser(toUser).success(function (data, status) {
        MessageService.sendMessage($scope.composeEmail)
          .success(function (data, status) {
            AlertService.displayMessage(data, 'success');
            closeModal();
          })
          .error(function (data, status) {
            AlertService.displayMessage(data, 'error');
          });
      }).error(function (data, status) {
        AlertService.displayMessage(data, 'error');
      });
    };

    var closeModal = function() {
      modal.dismiss('cancel');
    };
    $scope.closeComposePopup = function() {
      closeModal();
    };

  }])
  .controller('DisplayMessageCtrl', ['$scope', '$uibModalInstance', 'selectedEmail', 'activeTab',
    function ($scope, modal, selectedEmail, activeTab) {
      $scope.selectedEmail = selectedEmail;
      $scope.activeTab = activeTab;

      $scope.sendReplyEmail = function() {
        modal.close(selectedEmail);
      };

      $scope.closePopup = function() {
        modal.dismiss('cancel');
      };

    }]);
