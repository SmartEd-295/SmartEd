'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('ProfessorDetailsCtrl', ['$scope', 'AdminService', 'AlertService', 'ngTableParams', '$filter','$uibModal',

  function ($scope, AdminService, AlertService, ngTableParams, $filter, $uibModal) {

    var data = [];

    $scope.tableParams = new ngTableParams({
      page: 1,
      count: 10,
      sorting: {
        semesterYear: 'desc'
      }
    }, {
      total: data.length,
      getData: function ($defer, params) {

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

    var refresh = function () {
      AdminService.getProfessorCourseDetails().success(function (result, status) {
        data = result;
        $scope.tableParams.reload();
      }).error(function (data, status) {
        AlertService.displayBoxMessage(data, 'profDetailsContainer', 'error');
      });
    };
    refresh();

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.assignCourses = function(){
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/admin/assignCourse.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function () {

      }, function () {

      });
    };

    $scope.updateStatus = function(email, action){
      alert(email+":"+action);
    };

  }]);

myApp.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'AdminService', function ($scope, $uibModalInstance, AdminService) {

  var loadData = function(){
    $scope.yearList = [2016, 2017, 2018];
    $scope.termList = ['Spring', 'Summer', 'Fall'];

    AdminService.getCourses().success(function (result, status) {
      console.log(JSON.stringify(result));
      $scope.courseList = result;
    });

    AdminService.getAllProfessors().success(function (result, status) {
      console.log(JSON.stringify(result));
      $scope.emailList = result;
    });


  }
  loadData();

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
