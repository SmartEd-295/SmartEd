'use strict';
angular.module('smartedApp')
  .controller('ChartCtrl', ['$scope', '$stateParams', 'CourseService', function ($scope, $stateParams, CourseService) {

    // load course data
    var courseId = $stateParams.courseId;
    var term = $stateParams.term;
    var year = $stateParams.year;
    CourseService.getCourseDetails(courseId, term, year).success(function (data, status) {
      $scope.currentCourseData = data;
    }).error(function (data, status) {

    });

  }]);
