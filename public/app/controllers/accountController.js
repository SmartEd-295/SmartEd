'use strict';
var myApp = angular.module('myApp');

/*	CONTROLLER WILL BE INTIALIZED BASED ON DIFFERENT MODES PASSED FROM HOME CONTROLLER (FOR VIEW & CREATE)
*/
myApp.controller('AccountController', ['$scope', '$rootScope', 'close','$element', 'AccountService',
	'UserService', 'ModalService', 'AlertService', 'accountData', 'mode', '$location', function($scope, $rootScope, close, $element, AccountService, UserService, ModalService, AlertService, accountData, mode, $location) {

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


	/* 	WHILE CREATING AN ACCOUNT WE NEED TO LOAD COMBO LISTS.
	*/
	var refresh = function() {
	 	AccountService.getPaymentMethods().success( function (data, status) {
	  	$scope.meatadata = data;
	  	var paymentList = [];
	  	for (var i = data.length - 1; i >= 0; i--) {
	  		paymentList.push(data[i].payment_method);
	  	};
		  $scope.paymentMethodList = paymentList;
		});

	};


	/*	BASED ON PAYMENT TYPE DROPDOWN SELECTION LOAD SETTLEMENT AND
		PRESENTMENT CURRENCIES.
	*/
	$scope.loadCurrencies = function(itemValue){
		var meatadata = $scope.meatadata;
		for (var i = meatadata.length - 1; i >= 0; i--) {
			var paymentMethod = meatadata[i].payment_method;
	  		if(paymentMethod == itemValue){
	  			$scope.settlementCurrencyList = meatadata[i].settlement_currencies;
				$scope.presentmentCurrencyList = meatadata[i].presentment_currencies;
	  		}
	  	};
	}


	/*	MODE:
		CREATE: LOAD DROPDOWN DATA.
		VIEW: POPULATE ACCOUNT DETAILS COMING FROM HOME CONTROLLER.
		EDIT: JUST LOAD DROPDOWN FOR PRESENTMENT CURRENCIES BASED ON PAYMENT_METHOD IN POPULATED DATA.
	*/
	if(mode == 'Create'){
	   $scope.account = {};
     $scope.account.sub_account_id = "1";
     $scope.account.merchant_id = "115052504";
	  refresh();
	}else if(mode == 'View'){
		$scope.account = accountData;
	}else if(mode == 'Edit'){
		$scope.account = accountData;
		$scope.presentment_currencies = accountData.presentment_currencies;

		AccountService.getPaymentMethods().success( function (data, status) {
		  	var meatadata = data;
			for (var i = meatadata.length - 1; i >= 0; i--) {
				var paymentMethod = meatadata[i].payment_method;
		  		if(paymentMethod == accountData.payment_method){
		  			$scope.presentmentCurrencyList = meatadata[i].presentment_currencies;
		  		}
		  	}
		});
	}


	/*	FUNCTION TO CLOSE THE MODAL.
	*/
	$scope.close = function() {
	  close({},500); // close, but give 500ms for bootstrap to animate
	};


	/*	CREATE A MERCHANT ACCOUNT. CREATE ARRAY OF PRESENTMENT CURRENCIES,
		NOTIFICATION URLS AND SEND IT WITH OTHER ACCOUNT DETAILS.
	*/
	$scope.createAccount = function(){
		var accountDetails = $scope.account;

		var selectedCurrencies = $scope.presentment_currencies.split(" , ");
		accountDetails.presentment_currencies = selectedCurrencies;

		var notificationList = $scope.notification_urls.split(",");
		var notificationArray = [];
		for (var i = notificationList.length - 1; i >= 0; i--) {
			var url = (notificationList[i]).trim();
			if(url.length != 0){
				notificationArray.push(url);
			}
		}

		accountDetails.notification_urls = notificationArray;

		var currentUser = UserService.getCurrentUser();
    	if(currentUser != undefined){
    		accountDetails.created_by = currentUser.userName;
    	}

		AccountService.createAccount(accountDetails).success( function (data, status) {
      $element.modal('hide');
      close({},500);
      $rootScope.$broadcast("updateAccounts");
		}).error( function (data, status) {
			 AlertService.DetailedError($scope, data);
		});

	};


	/*	SELECT MULTIPLE PRESENTMENT CURRENCIES AND DISPLAY SEPRATED BY COMMA.
	*/
	$scope.selectCurrency = function(){

		var resultBox = $scope.presentment_currencies;
		var currency = $scope.currencySelector;

		var selectedCurrencies = "";

		if(resultBox != undefined){
			var contains = resultBox.search(currency);
			if (contains == -1) {
				if (resultBox.length == 0) {
					selectedCurrencies = currency;
				} else {
					selectedCurrencies = resultBox + " , " + currency;
				}
			} else {
				var position = resultBox.search(" , " + currency)
				if (position != -1) {
					selectedCurrencies = resultBox.replace(" , " + currency, "");
				} else {
					var newposition = resultBox.search(currency + " , ")
					if (newposition != -1)
						selectedCurrencies = resultBox.replace(currency + " , ", "");
					else
						selectedCurrencies = resultBox.replace(currency, "");
				}
			}
		}else{
			selectedCurrencies = currency;
		}

		$scope.presentment_currencies = selectedCurrencies;
		$scope.currencySelector = "";
	};


	/*	OPEN A POPUP MODAL POPULATED WITH ACCOUNT DATA IN SCOPE.
	*/
	$scope.editAccount = function(){
		$element.modal('hide');
		close({},500);

		 ModalService.showModal({
	      templateUrl: "/app/views/accountManagement/editAccount.html",
	      controller: "AccountController",
	      backdrop: 'static',
	      inputs: {
	      	accountData: accountData,
	      	mode : 'Edit'
	      }
	    }).then(function(modal) {
	      modal.element.modal();
	      modal.close.then(function(result) {

	      });
	    });
	}


	/*	EDIT AN ACCOUNT, AS OF NOW CAN ONLY EDIT PRESENTMENT_CURRENCIES.
	*/
	$scope.updateAccount = function(){
		var accountDetails = $scope.account;

		var selectedCurrencies = $scope.presentment_currencies.split(" , ");
		accountDetails.presentment_currencies = selectedCurrencies;
		AccountService.updateAccount(accountDetails).success( function (data, status) {
			  	AlertService.Success($scope, data);
		}).error( function (data, status) {
			 AlertService.DetailedError($scope, data);
		});
	}


	/*	OPEN A CONFIRMATION POPUP FOR DELETING AN ACCOUNT.
		IF DELETE BUTTON IS CONFIRMED THEN INITIATE THE DELETION OF ACCOUNT.
	*/
	$scope.deleteAccount = function(accountId){
		ModalService.showModal({
	      templateUrl: "/app/views/dialogBox.html",
	      controller: "DialogController",
	      backdrop: 'static',
	      inputs: {
	      	title: 'Delete Account',
	      	message : 'Are you sure to delete the account?',
	      	buttonText: 'Delete',
	      	mode: 'ACTION'
	      }
	    }).then(function(modal) {
	      modal.element.modal();
	      modal.close.then(function(result) {
	       	if(result){
	       		AccountService.deleteAccount(accountId).success( function (data, status) {
              $rootScope.$broadcast("updateAccounts");
              $element.modal('hide');
              close({},500);
            }).error( function (data, status) {
               AlertService.DetailedError($scope, data);
            });

	       	}
	      });
	    });
	}


	$scope.makePayment = function(accountId, paymentMethod, settlementCurrency){
    $element.modal('hide');
    close({},500);

    var accountData = {};
    accountData.accountId = accountId;
    accountData.paymentMethod = paymentMethod;
    accountData.settlementCurrency = settlementCurrency;

    AccountService.setAccountData(accountData);
    $location.path("/createPayment/ACCOUNT_CREATE");
	}
}]);
