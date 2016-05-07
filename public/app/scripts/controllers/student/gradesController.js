'use strict';

var myApp = angular.module('smartedApp');

// student Assignment controller
myApp.controller('StudentGradesPerformanceCtrl', ['$scope', 'StudentService', 'AlertService', 'UtilityService', 'CourseService',
  function ($scope, StudentService, AlertService, UtilityService, CourseService) {

    var termMap = new Object();
    termMap['SP'] = 'Spring';
    termMap['FA'] = 'Fall';

    // Flag to display visualizations or not
    $scope.displayStats = false;

    // load course data
    var mCourse = StudentService.getCurrentCourse();
    $scope.currentCourse = mCourse;

    // parsing course name to extract term and year
    if(mCourse.name.indexOf('CMPE') > -1) {
      $scope.displayStats = true;

      var courseId = mCourse.name.split(" ")[1];
      $scope.courseCode = courseId;

      var termYear = mCourse.name.split(" ")[0];
      var term = termMap[''+termYear.substring(0,2)];
      var year = "20" + (termYear.substring(2,4) - 1);

      console.log("-----------> " + courseId + " : " + termYear + " : " + term + " : "+ year) ;
      CourseService.getCourseDetails(courseId, term, year).success(function (result, status) {
        var course = result.courseData;
        $scope.currentCourseData = course;

        displayChart(result.chartData, course);

      }).error(function (data, status) {

      });
    }

    // display pie chart
    var displayChart = function (result, course) {
      var data = [];
      var colors = UtilityService.getColors();
      var brightness;
      var dataLength = result.length;

      for (var j = 0; j < dataLength; j += 1) {
        var obj = result[j];
        brightness = 0.2 - (j / dataLength) / 5;
        var colorIndex = (j == 1 ? 9 : j);
        if (j == 0) {
          data.push({
            name: "# of Students having "+obj._id+" : "+obj.total,
            y: obj.total,
            color: Highcharts.Color(colors[colorIndex]).brighten(brightness).get(),
            sliced: true,
            selected: true
          });
        } else {
          data.push({
            name: "# of Students having "+obj._id+" : "+obj.total,
            y: obj.total,
            color: Highcharts.Color(colors[colorIndex]).brighten(brightness).get()
          });
        }
      }

      var title = course.name,
        subTitle = "Term: " + term + " " + year,
        seriesName = "Grades",
        containerId = "studentGradesPerformanceContainer";

      UtilityService.draw3dPieChart(containerId, title, subTitle, seriesName, data);
    };




  }]);
