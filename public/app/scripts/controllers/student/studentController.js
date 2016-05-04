'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('StudentCtrl', ['$scope', 'ngTableParams', '$filter', '$uibModal', 'StudentService', 'AlertService',
    function ($scope, ngTableParams, $filter, $uibModal, StudentService, AlertService) {

      // Recommendation Screen
      var recommendedCourseList = [];

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

      var loadData = function () {
        StudentService.getCourseRecommendations().success(function (data, status) {
          recommendedCourseList = data.recommendations;
          $scope.tableParams.reload();
        }).error(function (data, status) {
          AlertService.displayBoxMessage(data, 'recommendationContainer', 'error');
        });
      };
      loadData();

      $scope.openModal = function (course) {
        var udacityData = [];

        StudentService.getUdacityCourses(course.courseName).success(function (result, status) {
          udacityData = result;

          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/student/courseRecommendationDetailsModal.html',
            controller: 'CourseRecommendationDetailsCtrl',
            resolve: {
              recommendedCourse: function () {
                return course;
              },
              udacityData: function () {
                return udacityData;
              }
            }
          });

          modalInstance.result.then(function () {
          });
        }).error(function (data, status) {
          AlertService.displayBoxMessage(data, 'recommendationContainer', 'error');
        });


      };
    }
  ])
  .controller('CourseRecommendationDetailsCtrl', ['$scope', '$uibModalInstance', 'recommendedCourse', 'udacityData', 'StudentService', 'AlertService',
    function ($scope, modal, recommendedCourse, udacityData, StudentService, AlertService) {
      $scope.recommendedCourse = recommendedCourse;
      $scope.udacityCourses = udacityData;

      $scope.closePopup = function () {
        modal.dismiss('cancel');
      };
  }])
  .controller('StudentCoursePerformanceCtrl', ['$scope', 'ngTableParams', '$filter', '$uibModal', 'StudentService', 'AlertService', '$stateParams', 'CourseService',
    function ($scope, ngTableParams, $filter, $uibModal, StudentService, AlertService, $stateParams, CourseService) {

      $scope.hc3dPieData = [
        ['Assignments', 8],
        ['Quizzes', 3],
        ['Midterm', 3],
        ['Final', 3],
        ['Labs', 6],
        ['Project', 8]
      ];

      // load course data
      var mCourse = $stateParams.course;
      $scope.currentCourse = JSON.parse(mCourse);
      console.log(" - i  student performance ctrl---------> : "+ JSON.parse(mCourse));
    }]);
