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

      //StudentService.getUdacityCourses(course.courseName).success(function (result, status) {
      //  udacityData = result;

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
      //}).error(function (data, status) {
      //  AlertService.displayBoxMessage(data, 'recommendationContainer', 'error');
      //});


    };
  }
]);

myApp.controller('CourseRecommendationDetailsCtrl', ['$scope', '$uibModalInstance', 'recommendedCourse', 'udacityData', 'StudentService', 'AlertService',
  function ($scope, modal, recommendedCourse, udacityData, StudentService, AlertService) {
    $scope.recommendedCourse = recommendedCourse;
    $scope.udacityCourses = udacityData;

    $scope.closePopup = function () {
      modal.dismiss('cancel');
    };
  }]);


/// Student Performance Main Controller
myApp.controller('StudentCoursePerformanceMainCtrl', ['$scope', '$stateParams', 'StudentService',
  function ($scope, $stateParams, StudentService) {

    // setting currentCourse for displaying name on main screen
    var mCourse = JSON.parse($stateParams.course);
    $scope.currentCourse = mCourse;
    StudentService.setCurrentCourse(mCourse);

  }]);


// student Assignment controller
myApp.controller('StudentAssignmentPerformanceCtrl', ['$scope', '$filter', '$sce', 'ngTableParams', 'StudentService', 'AlertService', 'UtilityService',
  function ($scope, $filter, $sce, ngTableParams, StudentService, AlertService, UtilityService) {


    // Flag to display visualizations or not
    $scope.displayStats = true;

    // load course data
    var mCourse = StudentService.getCurrentCourse();
    $scope.currentCourse = mCourse;
    console.log(" - StudentAssignmentPerformanceCtrl---------> : " + mCourse);

    //Assignments
    var assignmentList = [];
    var getAllAssignments = function () {
      StudentService.getAssignments(mCourse.id).success(function (data, status) {
        assignmentList = JSON.parse(data);

        for(var i=0; i< assignmentList.length; i++) {
          assignmentList[i].description = $sce.trustAsHtml(assignmentList[i].description);
        }

        $scope.assignmentList = assignmentList;
        displayBarChart(assignmentList);
      }).error(function (data, status) {
        AlertService.displayBoxMessage(data, 'studentAssignmentPerformanceContainer', 'error');
      });
    };
    getAllAssignments();


    /*// load table with data code
    var loadTableData = function() {
      $scope.tableParams = new ngTableParams({
        page: 1,
        count: 10
      }, {
        total: assignmentList.length,
        getData: function ($defer, params) {

          var orderedData = params.sorting ?
            $filter('orderBy')(assignmentList, params.orderBy()) :
            assignmentList;
          orderedData = params.filter ?
            $filter('filter')(orderedData, params.filter()) :
            orderedData;

          var resultData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

          params.total(orderedData.length);
          $defer.resolve(resultData);
        }
      });

      $scope.tableParams.reload();
    };*/


    // display bar chart
    var displayBarChart = function (result) {
      var title = "Assignment Details",
        subTitle = mCourse.name,
        seriesName1 = "Your Score",
        seriesName2 = "Max Score",
        containerId = "studentAssignmentPerformanceContainer";

      var data1 = [];
      var data2 = [];
      var dataLength = result.length;

      for (var j = 0; j < dataLength; j += 1) {
        var obj = result[j];
        if(!(obj === undefined || obj.submission === undefined || obj.submission.score === undefined)) {
          var scoreVal = obj.submission.score;
          if (!(scoreVal === undefined || scoreVal == '' || scoreVal == null)) {
            data1.push(scoreVal);
            data2.push(obj.points_possible);
          }
        }
      }

      if(!(data1 === undefined || data1.length == 0))
        UtilityService.draw3dBarChart(containerId, title, subTitle, seriesName1, data1, seriesName2, data2);
      else
        $scope.displayStats = false;
    };

  }]);


// Quiz performance
myApp.controller('StudentQuizPerformanceCtrl', ['$scope', '$filter', 'ngTableParams', 'StudentService', 'AlertService', 'UtilityService',
  function ($scope, $filter, ngTableParams, StudentService, AlertService, UtilityService) {

    var mCourse = StudentService.getCurrentCourse();
    $scope.currentCourse = mCourse;
    console.log(" - StudentQuizPerformanceCtrl---------> : " + mCourse);

    // Quizzes
    var quizList = [];
    var getAllQuizzes = function () {
      StudentService.getQuizzes(mCourse.id).success(function (data, status) {
        quizList = JSON.parse(data);
        //displayChart(quizList);
        console.log(" - i  student performance getallquizzes ctrl---------> : " + JSON.parse(data) + " : " + quizList.length);
      }).error(function (data, status) {
        AlertService.displayBoxMessage(data, 'studentQuizPerformanceContainer', 'error');
      });

    };
    getAllQuizzes();


    var displayChart = function (result) {
      var title = "Quizzes",
        seriesName = "Your Performance",
        containerId = "studentQuizPerformanceContainer";

      var data = [];
      var dataLength = result.length;

      for (var j = 0; j < dataLength; j += 1) {
        var obj = result[j];
        if (j == 0) {
          data.push(obj.submission);
        } else {
          data.push({
            name: obj.name + " (" + obj.alias + ")",
            y: obj.value
          });
        }
      }

      UtilityService.draw3dBarChart(containerId, title, seriesName, data);
    };


  }]);
