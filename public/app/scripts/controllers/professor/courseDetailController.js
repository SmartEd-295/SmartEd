'use strict';
angular.module('smartedApp')
  .controller('ChartCtrl', ['$scope', '$stateParams', 'CourseService', 'UtilityService', function ($scope, $stateParams, CourseService, UtilityService) {

    // load course data
    var courseId = $stateParams.courseId;
    var term = $stateParams.term;
    var year = $stateParams.year;

    $scope.courseCode = courseId;

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
        containerId = "professorSubjectDetailContainer";

      UtilityService.draw3dPieChart(containerId, title, subTitle, seriesName, data);
    };

    CourseService.getCourseDetails(courseId, term, year).success(function (result, status) {
      var course = result.courseData;
      $scope.currentCourseData = course;
      displayChart(result.chartData, course)
      console.log();
    }).error(function (data, status) {

    });

  }]);
