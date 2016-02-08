'use strict';

/*  ALL THE HTTP CALLS TO BACKEND SERVER FOR PAYMENT MANAGEMENT.
*/
var myApp = angular.module('myApp');

myApp.service('PaymentService', ['$http', function($http) {

  var paymentId = '';

  this.setId = function(selectedId){
    paymentId = selectedId;
  }

  this.getId = function(){
    return paymentId;
  }

  var paymentData = '';

  this.setPaymentData = function(data){
    paymentData = data;
  }

  this.getPaymentData = function(){
    return paymentData;
  }

  var viewPaymentData = '';

  this.setViewPaymentData = function(data){
    viewPaymentData = data;
  }

  this.getViewPaymentData = function(){
    return viewPaymentData;
  }

  this.getIssuers = function(accountId){
    return $http.get('/payment/getIssuers/'+accountId);
  }

  this.getPresentmentList = function(accountId){
    return $http.get('/payment/getPresentmentList/'+accountId);
  }

  this.createPayment = function(paymentDetails){
	  return $http.post('/payment/createPayment', paymentDetails);
  }

  this.getAllPayments = function(userName){
    return $http.get('/payment/getAllPayments/'+userName);
  }

  this.getPaymentDetails = function(paymentId){
    return $http.get('/payment/getPaymentDetails/'+paymentId);
  }

  this.changePaymentStatus = function(paymentId){
      return $http.get('/payment/changePaymentStatus/'+paymentId);
  }


}]);
