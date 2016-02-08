'use strict';

/*  ALL THE HTTP CALLS TO BACKEND SERVER FOR ACCOUNT MANAGEMENT.
*/
var myApp = angular.module('myApp');

myApp.service('AccountService', ['$http', function($http) {

  var accountData = '';

  this.setAccountData = function(data){
    accountData = data;
  }

  this.getAccountData = function(){
    return accountData;
  }

  this.getAllAccounts = function(userName){
    return $http.get('/account/getAllAccounts/'+userName);
  }

  this.viewAccount = function(accountId){
    return $http.get('/account/viewAccount/'+accountId);
  }

  this.createAccount = function(accountDetails){
	  return $http.post('/account/createAccount', accountDetails);
  }

  this.updateAccount = function(accountDetails){
    return $http.post('/account/updateAccount', accountDetails);
  }

  this.deleteAccount = function(accountId){
    return $http.get('/account/deleteAccount/'+accountId);
  }

  this.getPaymentMethods = function(){
	  return $http.get('/account/getPaymentMethod');
  }

  this.getSelectedAccounts =  function(userName, selectedMethod, selectedCurrency){
    return $http.get('/account/getSelectedAccounts/'+userName+'/'+selectedMethod+'/'+selectedCurrency);
  }

}]);
