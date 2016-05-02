'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('ProfessorDetailsCtrl', ['$scope', 'AdminService', 'AlertService', 'ngTableParams', '$filter', '$uibModal',

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

    var emailList = [];

    AdminService.getAllProfessors().success(function (result, status) {
      $scope.emailList = result;
    });

    $scope.assignCourses = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/admin/assignCourse.html',
        controller: 'AssignCourseCtrl',
        resolve: {
          emails: function () {
            return $scope.emailList;
          }
        }
      });

      modalInstance.result.then(function (returnVal) {
        if (returnVal != undefined && returnVal == 'REFRESH') {
          refresh();
        }
      }, function () {
        //modal closed, do nothing
      });
    };

    $scope.updateStatus = function (profDetails) {
      AdminService.changeStatus(profDetails).success(function (data, status) {
        refresh();
      }).error(function (data, status) {
        AlertService.displayBoxMessage(data, 'profDetailsContainer', 'error');
      });
    };

  }]);

myApp.controller('AssignCourseCtrl', ['$scope', '$uibModalInstance', 'AdminService', 'AlertService', 'emails',
  function ($scope, modal, AdminService, AlertService, emails) {

    var loadData = function () {
      $scope.yearList = [2016, 2017, 2018];
      $scope.termList = ['Spring', 'Summer', 'Fall'];

      $scope.emailList = emails;

      AdminService.getCourses().success(function (result, status) {
        $scope.courseList = result;
      });
    };
    loadData();

    $scope.addCourse = function () {
      AdminService.assignCourse($scope.profDetail).success(function (data, status) {
        modal.close('REFRESH');
      }).error(function (data, status) {
        AlertService.displayBoxMessage(data, 'assignCourseContainer', 'error');
      });
    };

    $scope.cancel = function () {
      modal.dismiss('cancel');
    };
  }]);
