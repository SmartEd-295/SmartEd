'use strict';
var myApp = angular.module('myApp');

myApp.controller('PaymentController', [ '$scope',
		'UserService', 'AccountService', 'PaymentService', 'AlertService', 'ModalService', 'ngTableParams', '$filter', '$q', '$location','$http',
		function($scope, UserService, AccountService, PaymentService, AlertService, ModalService, ngTableParams, $filter, $q, $location, $http) {

    /*	WHEN SCREEN LOADS CLOSE ANY ALERTS AND USED WHEN CLOSE BUTTON
        IN ALERT POPUP IS CLICKED
    */
    var closeAlerts = function(){
      AlertService.clearFlashMessage($scope);
    }
    $scope.closeAlert = closeAlerts;
//    closeAlerts();

    $scope.showDetails = function(){
        AlertService.DisplayError($scope, ModalService);
    }

    var data = [];
    var staticData = [];

    $scope.tableParams = new ngTableParams({
        page: 1,
        count: 10,
        sorting: {
          payment_date : 'desc'
        }
      }, {
          total: data.length,
          getData: function($defer, params) {

              var orderedData = params.sorting ?
                      $filter('orderBy')(data, params.orderBy()) :
                      data;
              orderedData = params.filter ?
                      $filter('filter')(orderedData, params.filter()) :
                      orderedData;

              var resultData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

              params.total(orderedData.length);
              $defer.resolve(resultData);
          }
    });


    $scope.paymentIdData = {};
    $scope.accountIdData = {};

    /*  POPULATE THE PAYMENT ID SEARCH DROPDOWN WHEN THE PAYMENT DATA LOADED IN TABLE.
    */
    var createPaymentList = function(data){
      var paymentIds = [];
      for (var i = data.length - 1; i >= 0; i--) {
        paymentIds.push({id: data[i].payment_id});
      };
      $scope.paymentIdList = paymentIds;
    }


    /*	LOAD ALL ACCOUNTS FOR THE LOGGED IN USER.
        THIS THE HOME PAGE FOR APPLICATION. AND SET DATA FOR
        PAGINATION AND SORTING.
    */
    // var data = null;
    var refresh = function() {
        var userName = '';
        var currentUser = UserService.getCurrentUser();
        if(currentUser != undefined){
          userName = currentUser.userName;
        }

        PaymentService.getAllPayments(userName).success( function (result, status) {
            data = result;
            staticData = result;
            $scope.tableParams.reload();
            createPaymentList(result);
        }).error( function (data, status) {
          AlertService.Error($scope, data);
        });
    };
    refresh();


    /*	THIS WILL WATCH FOR ANY BROADCASTED 'UPDATEPAYMENTS' EVENT IN THE ROOT SCOPE.
    		IF SO, JUST REFRESH THE DASHBOARD. FOR EXAMPLE PAYMENT CREATED OR DELETED, THEN
    		DASHBOARD WILL BE REFRESHED.
    	*/
    	$scope.$on("updatePayments", function (event, args) {
    	  refresh();
    	});


    /*  REDIRECT TO THE CREATE PAYMENT PAGE
    */
    $scope.createPayment = function(){
      $location.path('/createPayment/DIRECT_CREATE');
    }


    /*  RESET ALL THE COMBO BOXES AND REMOVE FILTERS AND SORTERS.
        IF DATA IS CHANGED BECAUSE OF DATE SEARCH THEN REASSIGN IT TO STATIC DATA.

    */
    var reset = function(resetAll){
        $scope.showPayment = false;
        $scope.showAccount = false;
        $scope.showDate = false;
        $scope.paymentIdData = {};
        $scope.accountIdData = {};
        $scope.date1 = '';
        $scope.date2 = '';

        if(resetAll){
          $scope.searchOption = '';
          $scope.tableParams.filter({});
          $scope.tableParams.sorting({payment_date : 'desc'});
        }

        if(data.length != staticData.length){
          data = staticData;
          $scope.tableParams.reload();
        }
    }
    $scope.reset = function(){
      reset(true);
    }


   /* SHOW SPECIFIC SEARCH ELEMENT BASED ON SELECTION
      IF PAYMENT - SHOW THE DROPDOWN
      IF ACCOUNT - CHECK IF LIST IS THERE IN SCOPE, IF NOT MAKE A REST CALL
        (TO REUSE EXISTING METHOD, PAYMENT & CURRENCY WILL BE PASSED AS EMPTY STRING).
   */
	 $scope.selectSearchType = function(searchOption){
	    reset(false);
	    if(searchOption == 'payment'){
	      $scope.showPayment = true;
	    }else if(searchOption == 'account'){
          if($scope.accountList == undefined || $scope.accountList.length == 0){
            var userName = '';
            var currentUser = UserService.getCurrentUser();
            if(currentUser != undefined){
              userName = currentUser.userName;
            }

            AccountService.getSelectedAccounts(userName, "EMPTY", "EMPTY").success( function (result, status) {
              $scope.accountList = result;
              $scope.showAccount = true;
            })
          }else{
            $scope.showAccount = true;
          }
      }else if(searchOption == 'date'){
        $scope.showDate = true;
      }
	 }


    /*  BASED ON SEARCH OPTION APPLY THE SPECIFIC FILTER.
    */
    $scope.searchPayments = function(searchOption, value, value2){
        if(searchOption == 'payment'){
          if(value != undefined){
            $scope.tableParams.filter({payment_id: value});
          }else{
            $scope.tableParams.filter({});
          }
        }else if(searchOption == 'account'){
          if(value != undefined){
            $scope.tableParams.filter({account_id: value});
          }else{
            $scope.tableParams.filter({});
          }
        }else if(searchOption == 'date'){
          if(value != undefined && value2 != undefined){
            var firstDate = Date.parse(value);
            var lastDate = Date.parse(value2);
            var temp = [];
            for (var i = staticData.length - 1; i >= 0; i--) {
              var checkDate = Date.parse(staticData[i].payment_date);
              if((checkDate <= lastDate && checkDate >= firstDate) || (checkDate >= lastDate && checkDate <= firstDate)){
                temp.push(staticData[i]);
              }
            }
            data = temp;
            $scope.tableParams.reload();
          }
        }
    }

    $scope.viewPayment = function(selectedId){
      PaymentService.getPaymentDetails(selectedId).success( function (data, status) {
        PaymentService.setViewPaymentData(data);
        $location.path('/viewPayment');
      }).error( function (data, status) {
         AlertService.DetailedError($scope, data);
      });
    }
} ])
