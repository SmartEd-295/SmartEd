'use strict';
var myApp = angular.module('myApp');

myApp.controller('HomeController', [ '$scope',
		'UserService', 'AccountService', 'AlertService', 'ModalService', 'ngTableParams', '$filter', '$q',
		function($scope, UserService, AccountService, AlertService, ModalService, ngTableParams, $filter, $q) {


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

  var data = [];

  $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,// count per page
        sorting: {
          creation_date : 'desc' //SHORT BY DEFAULT BY CREATION_DATE
        }
      }, {
          total: data.length, // length of data
          getData: function($defer, params) {
              // use build-in angular filter
              var orderedData = params.sorting ?
                      $filter('orderBy')(data, params.orderBy()) :
                      data;
              orderedData = params.filter ?
                      $filter('filter')(orderedData, params.filter()) :
                      orderedData;

              var resultData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

              $scope.accountDetails = resultData;

              params.total(orderedData.length); // set total for recalc pagination
              $defer.resolve(resultData);
          }
  });


	/*	LOAD ALL ACCOUNTS FOR THE LOGGED IN USER.
		THIS THE HOME PAGE FOR APPLICATION.
	*/
	var refresh = function() {
		var userName = '';
		var currentUser = UserService.getCurrentUser();
		if(currentUser != undefined){
			userName = currentUser.userName;
		}

		AccountService.getAllAccounts(userName).success( function (result, status) {
		  data = result;
		  $scope.tableParams.reload();
		}).error( function (data, status) {
		  AlertService.Error($scope, data);
		});
	};

	refresh();


	/*	THIS WILL WATCH FOR ANY BROADCASTED 'UPDATEACCOUNTS' EVENT IN THE ROOT SCOPE.
		IF SO JUST REFRESH THE DASHBOARD. FOR EXAMPLE ACCOUNT CREATED OR DELETED, THEN
		DASHBOARD WILL BE REFRESHED.
	*/
	$scope.$on("updateAccounts", function (event, args) {
	  refresh();
	});


	/*	OPEN UP A MODAL POPUP TO CREATE AN ACCOUNT.
	*/
	$scope.createAccount = function() {

	    ModalService.showModal({
	      templateUrl: "/app/views/accountManagement/createAccount.html",
	      controller: "AccountController",
	      backdrop: 'static',
	      inputs: {
	      	accountData: '',
	      	mode : 'Create'
	      }
	    }).then(function(modal) {
	      modal.element.modal();
	      modal.close.then(function(result) {
      });
	    });

	};


	/*	GET PARTICULAR ACCOUNT DETAILS WHEN CLICKING ON VIEW ACCOUNT BUTTON.
		IF ACCOUNT DETAILS FOUND, OPEN UP A MODAL POPUP AND POPULATE THE DATA.
	*/
	$scope.viewAccount = function(accountId) {
		AccountService.viewAccount(accountId).success( function (data, status) {
		   ModalService.showModal({
		      templateUrl: "/app/views/accountManagement/viewAccount.html",
		      controller: "AccountController",
		      backdrop: 'static',
		      inputs: {
		      	accountData: data,
		      	mode: 'View'
		      }
		    }).then(function(modal) {
		      modal.element.modal();
		      modal.close.then(function(result) {

		      });
		    });
		}).error( function (data, status) {
		 	AlertService.DetailedError($scope, data);
		});
	};
} ])
