'use strict';
var myApp = angular.module('myApp');

myApp.controller('BankDetailsController', [ '$scope',
		'UserService', 'AccountService', 'PaymentService', 'AlertService', 'ModalService','$location',
		function($scope, UserService, AccountService, PaymentService, AlertService, ModalService, $location) {


	 /*	WHEN SCREEN LOADS CLOSE ANY ALERTS AND USED WHEN CLOSE BUTTON
	 	IN ALERT POPUP IS CLICKED
	 */
	 var closeAlerts = function(){
	 	AlertService.clearFlashMessage($scope);
	 }
	 $scope.closeAlert = closeAlerts;
	 closeAlerts();

	 $scope.showDetails = function(){
       AlertService.DisplayError($scope, ModalService);
   }

   /*  GET PAYMENT DATA ENTERED IN CREATE PAYMENT SCREEN FROM PAYMENT SERVICE
   */
	 var paymentDetails = PaymentService.getPaymentData();


   /*  POPULATE THE COLLECTED DATA FOR PAYER AND TRANSACTION DETAILS.
   */
	 var displayDetails = function(){
	    var first_name = paymentDetails.firstName;
	    var last_name = paymentDetails.lastName;

      $scope.name = first_name + " " + last_name;

      $scope.phone = (paymentDetails.phone != undefined && paymentDetails.phone != null) ? paymentDetails.phone : "N/A";

      var tempMail = first_name+"."+last_name+"@merchant.com";
      $scope.email = (paymentDetails.email != undefined && paymentDetails.email != null) ? paymentDetails.email : tempMail;

      var city = (paymentDetails.shipping != undefined && paymentDetails.shipping != null) ? paymentDetails.shipping+", " : "";
      var country = (paymentDetails.countryCode != undefined && paymentDetails.countryCode != null) ? paymentDetails.countryCode : "";
      $scope.address = city + country;

      $scope.description = paymentDetails.description;

      $scope.amount = paymentDetails.amount+" "+paymentDetails.currency;

      var tax = (paymentDetails.tax != undefined && paymentDetails.tax != null) ? paymentDetails.tax : 0;
      $scope.tax = tax + " " + paymentDetails.currency;

      var handlingFee = (paymentDetails.handlingFee != undefined && paymentDetails.handlingFee != null) ? paymentDetails.handlingFee : 0;
      $scope.handlingFee = handlingFee + " " +paymentDetails.currency;

      $scope.paymentId = paymentDetails._id;
   }
	 displayDetails();


   /*   CREATE PAYMENT USING THE RECEIVED DATA, CREDENTIALS ON THIS BANK FORM ARE JUST FOR MOCKING
        BANK EXPERIENCE.
   */
	 $scope.confirmPayment = function(){
      var id = $scope.paymentId;
      var tempId = id.replace("ALT-","");
        $scope.displayWait = true;
        $scope.displayMessage = "Confirming Payment...";
      PaymentService.changePaymentStatus(tempId).success( function (data, status) {

         PaymentService.getPaymentDetails(id).success( function (data, status) {
           $scope.displayWait = false;
           PaymentService.setViewPaymentData(data);
           $location.path('/viewPayment');
         }).error( function (data, status) {
            $scope.displayWait = false;
            AlertService.DetailedErrorGlobal(data);
            $location.path('/payment');
         });

      }).error( function (data, status) {
         $scope.displayWait = false;
         AlertService.DetailedErrorGlobal(data);
         $location.path('/payment');
      });
	 }
} ])
