'use strict';
var myApp = angular.module('myApp');

myApp.controller('PaymentDetailsController', [ '$scope',
		 'PaymentService', 'AlertService', '$location',
		function($scope, PaymentService, AlertService, $location) {

    /*	WHEN SCREEN LOADS CLOSE ANY ALERTS AND USED WHEN CLOSE BUTTON
        IN ALERT POPUP IS CLICKED
    */
    var closeAlerts = function(){
      AlertService.clearFlashMessage($scope);
    }
    $scope.closeAlert = closeAlerts;
    closeAlerts();

    var loadData = function(){

          var data = PaymentService.getViewPaymentData();

          var payment = {};
          var result = data.paymentDetails;
          payment.paymentId = result._id;
          payment.parentId = result.parentId;
          payment.paymentMethod = result.payment_method;
          payment.settlement = result.settlement_currency;
          payment.status = result.status;
          payment.externalId = result.externalId;
          payment.issuer = result.issuerBank;
          payment.accountId = result.account_id;
          payment.firstName = result.firstName;
          payment.lastName = result.lastName;
          payment.phone = result.phone;
          payment.shipping = result.city;
          payment.country = result.countryCode;
          payment.payerMail = result.email;
          payment.amount = result.amount;
          payment.currency = result.currency;
          payment.subTotal = result.subTotal;
          payment.tax = result.tax;
          payment.handlingFee = result.handlingFee;
          payment.description = result.description;
          payment.itemName = result.itemName1;
          payment.itemQuantity = result.itemQuantity1;
          payment.itemPrice = result.itemPrice1;
          payment.itemName2 = result.itemName2;
          payment.itemQuantity2 = result.itemQuantity2;
          payment.itemPrice2 = result.itemPrice2;
          payment.return_url = result.return_url;
          payment.cancel_url = result.cancel_url;
          payment.requestId = result.requestId;
          payment.issuerUrl = result.issuerDetails.url;
          payment.issuerResponse = result.issuerDetails.responseData;

          if(result.paymentDetails != undefined){
              payment.paymentUrl = result.paymentDetails.url;
              payment.paymentRequest = result.paymentDetails.requestData;
              payment.paymentResponse = result.paymentDetails.responseData;
          }

          if(data.callbackDetails != undefined){
            payment.callback = data.callbackDetails;
          }

          $scope.payment = payment;
    }
    loadData();

    $scope.viewAll = function(){
      $location.path('/payment');
    }
} ])
