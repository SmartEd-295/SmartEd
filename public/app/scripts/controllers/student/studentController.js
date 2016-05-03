'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('StudentCtrl', ['$scope', 'ngTableParams', '$filter', '$uibModal', 'StudentService', 'AlertService',
  function ($scope, ngTableParams, $filter, $uibModal, StudentService, AlertService) {

    var recommendedCourseList = [];

    var loadData = function() {
      StudentService.getCourseRecommendations().success(function (data, status) {

        recommendedCourseList = data[0].recommendations;
        $scope.recommendedCourseList = recommendedCourseList;
        console.log("------------> " + JSON.stringify(recommendedCourseList));

      }).error(function (data, status) {
        AlertService.displayMessage(data, 'error');
      });
    };
    loadData();


    $scope.tableParams = new ngTableParams({
      page: 1,
      count: 10
    }, {
      total: recommendedCourseList.length,
      getData: function ($defer, params) {

        var orderedData = params.sorting ?
          $filter('orderBy')(recommendedCourseList, params.orderBy()) :
          recommendedCourseList;
        orderedData = params.filter ?
          $filter('filter')(orderedData, params.filter()) :
          orderedData;

        var resultData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

        params.total(orderedData.length);
        $defer.resolve(resultData);
      }
    });


    // display popup functions
    $scope.openModal = function(course) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/student/courseRecommendationDetailsModal.html',
        controller: 'CourseRecommendationDetailsCtrl',
        resolve: {
          recommendedCourse: function () {
            return course;
          }
        }
      });

      modalInstance.result.then(function () {

      }, function () {
        //modal closed, do nothing
      });
    };
  }
  ])
  .controller('CourseRecommendationDetailsCtrl', ['$scope', '$uibModalInstance', 'recommendedCourse', 'StudentService', 'AlertService',
  function ($scope, modal, recommendedCourse, StudentService, AlertService) {
    $scope.recommendedCourse = recommendedCourse;

    var udacityCourses = [];

    var loadUdacityData = function() {
      StudentService.getUdacityCourses(recommendedCourse.courseName).success(function (data, status) {
        udacityCourses = data;
        $scope.udacityCourses = udacityCourses;

      }).error(function (data, status) {
        AlertService.displayMessage(data, 'error');
      });
    };
    loadUdacityData();

    $scope.closePopup = function() {
      modal.dismiss('cancel');
    };

  }]);
