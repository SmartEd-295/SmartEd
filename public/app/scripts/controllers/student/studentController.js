'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('StudentCtrl', ['$scope', 'ngTableParams', '$filter', '$uibModal', 'StudentService', 'AlertService', '$stateParams', 'CourseService',
  function ($scope, ngTableParams, $filter, $uibModal, StudentService, AlertService, $stateParams, CourseService) {

    // Course Screen
    $scope.line = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      series: ['Series A', 'Series B'],
      data: [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ],
      onClick: function (points, evt) {
        console.log(points, evt);
      }
    };

    $scope.bar = {
      labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
      series: ['Series A', 'Series B'],

      data: [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ]

    };

    $scope.donut = {
      labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
      data: [300, 500, 100]
    };

    $scope.radar = {
      labels:["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],

      data:[
        [65, 59, 90, 81, 56, 55, 40],
        [28, 48, 40, 19, 96, 27, 100]
      ]
    };

    $scope.pie = {
      labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
      data : [300, 500, 100]
    };

    $scope.polar = {
      labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
      data : [300, 500, 100, 40, 120]
    };

    $scope.dynamic = {
      labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
      data : [300, 500, 100, 40, 120],
      type : 'PolarArea',

      toggle : function ()
      {
        this.type = this.type === 'PolarArea' ?
          'Pie' : 'PolarArea';
      }
    };



    $scope.hc3dPieData = [
      ['Assignments', 8],
      ['Quizzes', 3],
      ['Midterm', 3],
      ['Final', 3],
      ['Labs', 6],
      ['Project', 8]
    ];

    // load course data
    var courseId = $stateParams.courseId;
    var term = $stateParams.term;
    var year = $stateParams.year;
    CourseService.getCourseDetails(courseId, term, year).success(function (data, status) {
      $scope.currentCourseData = data;
    }).error(function (data, status) {

    });


    // Recommendation Screen
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
