'use strict';
var myApp = angular.module('myApp');

myApp.controller('PaymentActionController', [ '$scope',
		'UserService', 'AccountService', 'PaymentService', 'AlertService', 'ModalService','$location', '$routeParams', '$timeout','$window',
		function($scope, UserService, AccountService, PaymentService, AlertService, ModalService, $location, $routeParams, $timeout, $window) {

	 /*	WHEN SCREEN LOADS CLOSE ANY ALERTS AND USED WHEN CLOSE BUTTON
	 	IN ALERT POPUP IS CLICKED
	 */
	 var closeAlerts = function(){
	  AlertService.clearFlashMessage($scope);
	 }
	 $scope.closeAlert = closeAlerts;
	 closeAlerts();

   var createMode = $routeParams.displayMode;

   /*  UPDATE THE PROGRESS BAR ACCORDING TO MODE PASSED.
       IF IS ACTIVE IS TRUE THAT MEANS API CALL IS GOING ON SO IT WILL DISPLAY CONTINUOUS STRIPS.
   */
   var updateProgress = function(mode, isActive){
      if(mode == "INITIAL"){
        $scope.barValue = 25;
        $scope.barType = "";
        $scope.barMsg = "Enter Payment Details";
        $scope.barClass = "";
      }else if(mode == "GET ACCOUNT"){
        $scope.barValue = 50;
        $scope.barType = "info";
        if(isActive){
          $scope.barClass = "progress-striped active";
          $scope.barMsg = "Getting Account Details";
        }else{
          $scope.barClass = "";
          $scope.barMsg = "Select Account";
        }
      }else if(mode == "GET ISSUER"){
        $scope.barValue = 75;
        $scope.barType = "warning";
        if(isActive){
          $scope.barClass = "progress-striped active";
          $scope.barMsg = "Getting Issuer Information";
        }else{
          $scope.barClass = "";
          $scope.barMsg = "Select Issuer";
        }
      }else if(mode == "SUCCESS"){
        $scope.barClass = "";
        $scope.barValue = 100;
        $scope.barMsg = "Initiate Payment";
        $scope.barType = "success";
        $scope.barClass = "";
      }

   }

   /*  FOR ANY CHANGES IN PAYMENT METHOD, CURRENCY AND ACCOUNT, RESET AND HIDE THE OTHER ELEMENTS.
       CountryReset: When Country Selected
       PaymentReset: When Payment Method Selected
       CurrencyReset: When Currency Selected
       AccountReset: When Account Selected
   */
    var reset = function(mode){
      $scope.issuerLoaded = false;
      $scope.payment.issuer = '';

      if(mode != 'CountryReset'){
       $scope.payment.countryCode = '';
       $scope.accountLoaded = false;
        if(mode == 'PaymentReset'){
         $scope.payment.settlement = '';
         $scope.payment.accountId = '';
         updateProgress("INITIAL");
       }else if(mode == 'CurrencyReset'){
         $scope.payment.accountId = '';
       }else if(mode == 'AccountReset'){
         //DO NOTHING
       }
      }
    }

    /*  FOR SELECTED ACCOUNT GET ISSUER'S LIST INCLUDING COUNTRY CODES.
     */
      function getIssuersData(accountId){
        reset('AccountReset');
        updateProgress("GET ISSUER", true);
       if(accountId != undefined){
           loadPresentmentCurrency(accountId);
           PaymentService.getIssuers(accountId).success(function(data, status){
             $scope.accountLoaded = true;
             var result = data.responseData;
             $scope.issuerMasterData = data;
             var countries = [];
             for (var i = result.length - 1; i >= 0; i--) {
               countries.push(result[i].country_code);
             };
             $scope.countryList = countries;
             updateProgress("GET ISSUER", false);
           }).error(function(data, status){
              updateProgress("GET ACCOUNT", false);
              AlertService.DetailedError($scope, data);
           });
         }
    }


    function loadPresentmentCurrency(accountId){
        PaymentService.getPresentmentList(accountId).success(function(data, status){
           $scope.currencyList = data.presentmentCurrency;
         });
    }

    /* 	WE NEED TO LOAD COMBO LIST FOR PAYMENT METHODS ON PAGE REFRESH.
   	*/
   	var refresh = function() {
     updateProgress("INITIAL");

     if(createMode == "DIRECT_CREATE"){
        $scope.directCreate = true;
        AccountService.getPaymentMethods().success( function (data, status) {
          $scope.metaData = data;
          var paymentList = [];
          for (var i = data.length - 1; i >= 0; i--) {
            paymentList.push(data[i].payment_method);
          };
          $scope.paymentMethodList = paymentList;
        });
     }else if(createMode == "ACCOUNT_CREATE"){
        var accountData = AccountService.getAccountData();
        if(accountData != undefined && accountData.accountId != undefined){
            var tempId = accountData.accountId;
            var tempPaymentMethod = accountData.paymentMethod;
            var currency = accountData.settlementCurrency;
            var payment = {};
            $scope.accountCreate = true;
            payment.paymentMethod= tempPaymentMethod;
            payment.settlement = currency;
            payment.accountId = tempId;

            $scope.payment = payment;

            getIssuersData(tempId);

        }else{
          $location.path("/payment");
        }

     }
   	};
    refresh();


   	/*	BASED ON PAYMENT TYPE DROPDOWN SELECTION, LOAD SETTLEMENT CURRENCIES.
   	*/
   	$scope.loadCurrencies = function(selectedMethod){
   	  reset('PaymentReset');
   		var metaData = $scope.metaData;
   		for (var i = metaData.length - 1; i >= 0; i--) {
   			var paymentMethod = metaData[i].payment_method;
   	  		if(paymentMethod == selectedMethod){
   	  			$scope.settlementCurrencyList = metaData[i].settlement_currencies;
//   	  			$scope.currencyList = metaData[i].presentment_currencies;
   	  		}
   	  	};
   	}


    /*  FETCH ACCOUNT IDS BASED ON SELECTED METHOD AND CURRENCY.
    */
   	$scope.loadAccounts = function(selectedMethod, selectedCurrency){
      reset('CurrencyReset');
      updateProgress("GET ACCOUNT", true);
      if(selectedMethod != undefined && selectedCurrency != undefined){
          var userName = '';
          var currentUser = UserService.getCurrentUser();
          if(currentUser != undefined){
            userName = currentUser.userName;
          }

          AccountService.getSelectedAccounts(userName, selectedMethod, selectedCurrency).success( function (result, status) {
            $scope.accountList = result;
            updateProgress("GET ACCOUNT", false);
          }).error( function (data, status) {
            updateProgress("INITIAL", false);
            AlertService.Error($scope, data);
          });
      }
   	}




    /*  FOR SELECTED ACCOUNT GET ISSUER'S LIST INCLUDING COUNTRY CODES.
    */
    $scope.getIssuersList = function(accountId){
      getIssuersData(accountId);
    }

    /*  FOR SELECTED COUNTRY, POPULATE ISSUERS IN THE COMBO.
    */
   	$scope.loadIssuers = function(countryCode){
   	  reset('CountryReset');
   	  if(countryCode != undefined){
   	      var resultList = $scope.issuerMasterData.responseData;
          for (var i = resultList.length - 1; i >= 0; i--) {
            var countryVal = resultList[i].country_code;
              if(countryVal == countryCode){
                $scope.issuerList = resultList[i].issuers;
              }
            };
   	  }
   	}


    /*  LOAD THE REST OF THE FORM ONCE ISSUER SELECTED
    */
   	$scope.issuerSelected = function(){
   	  $scope.issuerLoaded = true;
   	  $scope.payment.return_url = "http://www.merchant.com";
   	  $scope.payment.cancel_url = "http://www.merchant.com";
   	  updateProgress("SUCCESS");
   	}

   	function displayTotalError(){
      var displayMessage = "Total and Sub Total are calculated as below: <br/><br/> SubTotal = (Item1 quantity* price) + (Item2 quantity* price) <br/><br/> Total = Sub Total + Handling Fee + Tax";
      ModalService.showModal({
        templateUrl: "/app/views/dialogBox.html",
        controller: "DialogController",
        backdrop: 'static',
        inputs: {
          title: 'Sub Total Details',
          message : displayMessage,
          buttonText: '',
          mode: 'DISPLAY'
        }
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {});
      });
    }

    $scope.subTotalMessage = displayTotalError;

    function checkAmountTotal(){
      var paymentObj = $scope.payment;
      var amount = paymentObj.amount != null ? paymentObj.amount : 0;
      var subTotal = paymentObj.subTotal != null ? paymentObj.subTotal : 0;
      var tax = paymentObj.tax != null? paymentObj.tax : 0;
      var handlingFee = paymentObj.handlingFee != null ? paymentObj.handlingFee : 0;
      var itemQuantity1 = paymentObj.itemQuantity != null ? paymentObj.itemQuantity : 0;
      var itemCost1 = paymentObj.itemPrice != null ? paymentObj.itemPrice : 0;
      var itemQuantity2 = paymentObj.itemQuantity2 != null ? paymentObj.itemQuantity2 : 0;
      var itemCost2 = paymentObj.itemPrice2 != null ? paymentObj.itemPrice2 : 0;

      var subTemp = (itemQuantity1*itemCost1) + (itemQuantity2*itemCost2);
      var amountTemp = 0;

      if(subTemp == 0 && handlingFee == 0 && tax == 0 && subTotal == 0){
        return true;
      }else if(subTemp != 0){
        if(subTemp != subTotal){
          return false;
        }else{
          amountTemp = parseFloat(subTotal) + parseFloat(handlingFee) + parseFloat(tax);
        }
      }else if(subTotal != 0 || tax != 0 || handlingFee != 0){
        amountTemp = parseFloat(subTotal) + parseFloat(handlingFee) + parseFloat(tax);
      }

      if(amountTemp != amount){
        return false;
      }else{
        return true;
      }
    }

   	$scope.createPayment = function(){
      $window.scrollTo(0,0);

//   	  alert(JSON.stringify($scope.payment));

      var isCorrect = checkAmountTotal();

      if(isCorrect){
        $scope.displayWait = true;
        $scope.displayMessage = "Creating a payment";
        var paymentDetails = $scope.payment;

        var currentUser = UserService.getCurrentUser();
        if(currentUser != undefined){
          paymentDetails.created_by = currentUser.userName;
        }

        paymentDetails.issuerData = $scope.issuerMasterData;

        PaymentService.createPayment(paymentDetails).success( function (data, status) {
              PaymentService.setPaymentData(data);
              var url = data.redirect_Url != undefined && data.redirect_Url != "" ? data.redirect_Url : "https://myideal.test.db.com/ideal/issuerSim.do";
              $scope.displayMessage = 'Redirecting to "'+url+'"';
              $timeout(function(){
                  $scope.displayWait = false;
                  $location.path('/confirmPayment');
               }, 8000);
          }).error( function (data, status) {
             $scope.displayWait = false;
             AlertService.DetailedError($scope, data);
          });
      }else{
          displayTotalError();
      }
   	}

   	$scope.showDetails = function(){
      AlertService.DisplayError($scope, ModalService);
    }

    function makeId()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 14; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

   	$scope.fillData = function(){
        $scope.payment.requestId = makeId();
        $scope.payment.externalId = "abc446w5w5465caa31";
        $scope.payment.firstName = "James";
        $scope.payment.lastName = "Clark";
        $scope.payment.phone = "6692458741";
        $scope.payment.shipping = "Berlin";
        $scope.payment.payerMail = "james.clark@merchant.com";
        $scope.payment.amount = 47;
        $scope.payment.subTotal = 40;
        $scope.payment.tax = 4;
        $scope.payment.handlingFee = 3;
        $scope.payment.description = "Payment for the stationery items.";
        $scope.payment.itemName = "Books" ;
        $scope.payment.itemQuantity= 2;
        $scope.payment.itemPrice = 10;
        $scope.payment.itemName2 = "Pencils";
        $scope.payment.itemQuantity2= 4;
        $scope.payment.itemPrice2 = 5;
   	}

   	$scope.eraseData = function(){
        $scope.payment.requestId = "";
        $scope.payment.externalId = "";
        $scope.payment.firstName = "";
        $scope.payment.lastName = "";
        $scope.payment.phone = "";
        $scope.payment.shipping = "";
        $scope.payment.payerMail = "";
        $scope.payment.amount = '';
        $scope.payment.currency = "";
        $scope.payment.subTotal = '';
        $scope.payment.tax = '';
        $scope.payment.handlingFee = '';
        $scope.payment.description = "";
        $scope.payment.itemName = "" ;
        $scope.payment.itemQuantity= '';
        $scope.payment.itemPrice = '';
        $scope.payment.itemName2 = "";
        $scope.payment.itemQuantity2= '';
        $scope.payment.itemPrice2 ='';
   	}
}])
